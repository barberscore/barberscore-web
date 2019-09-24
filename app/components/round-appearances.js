import { not, sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import { denodeify } from 'rsvp'

export default Component.extend({
  flashMessages: service(),
  router: service(),
  algolia: service(),
  store: service(),
  isDisabled: not(
    'model.permissions.write',
  ),
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
    let func = denodeify(this.algolia.search.bind(this.algolia))
    let res = yield func({ indexName: 'Group', query: term}, { filters: `get_kind_display:${kindModel} OR get_kind_display:VLQ` })
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
        isPrivate: true,
        groupId: obj.objectID,
        name: obj.name,
        kind: obj.get_kind_display,
        gender: obj.get_gender_display,
        district: obj.get_district_display,
        division: obj.get_division_display,
        bhsId: obj.bhs_id,
        code: obj.code,
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
  }
});


