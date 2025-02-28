import { not, sort, alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import { denodeify } from 'rsvp'

export default Component.extend({
  flashMessages: service(),
  router: service(),
  algolia: service(),
  store: service(),
  isEditing: false,
  isDisabled: not(
    'model.permissions.write',
  ),
  mt: alias('model.appearences.firstObject'),
  hasMt: computed('model.appearences.firstObject', 'model.appearences.@each.id', function() {
    console.log(this.get('model'));
    if (this.model.appearences && this.model.appearences.firstObject.num === 0) {
      return true;
    }
    return false;
  }),
  sortedAppearancesProperties: [
    'num',
  ],
  sortedAppearances: sort(
    'model.appearances',
    'sortedAppearancesProperties'
  ),
  searchGroup: task(function* (term){
    yield timeout(600);
    let kindModel = this.get('model.sessionKind');
    let res = yield this.algolia.search({ indexName: 'Group', query: term})
    return res.hits
  }),
  createAppearanceModal: false,
  createAppearanceModalError: false,
  saveAppearance: task(function* (obj, num){
    try {
      let group = yield this.store.findRecord('group', obj.objectID)
      let owners = yield group.owners;
      yield this.store.createRecord('appearance', {
        num: num,
        participants: "",
        area: obj.get_district_display,
        isPrivate: false,
        groupId: obj.objectID,
        name: group.name,
        kind: obj.get_kind_display,
        gender: obj.get_gender_display,
        district: obj.get_district_display,
        division: obj.get_division_display,
        bhsId: group.bhs_id,
        code: group.code,
        round: this.model,
        songs: [],
        charts: [],
        owners: owners,
      }).save();
      this.set('createAppearanceModal', false);
      this.set('createAppearanceModalError', false);
      this.set('num', null);
      this.set('group', null);
      this.flashMessages.success("Created!");
    } catch(e) {
      e.errors.forEach((e) => {
        this.set('createAppearanceModalError', true);
        this.flashMessages.danger(e.detail);
      })
    }
  }).drop(),
  deleteAppearance: task(function *(appearance) {
    try {
      yield appearance.destroyRecord();
      this.flashMessages.success("Deleted!");
    } catch(e) {
      this.flashMessages.danger("Problem!");
    }
  }).drop(),
  actions: {
    cancelAppearance(appearance){
      appearance.deleteRecord();
    },
    toggleOrderOfAppearance(){
      this.toggleProperty('isEditing');
    },
    reorderItems(itemModels) {
      itemModels.forEach(function(item, index) {
        item.set('num', index + 1);
      });
      itemModels.invoke('save');
      this.flashMessages.success('Success');
    },
  }
});


