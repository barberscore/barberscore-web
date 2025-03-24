import { not, sort, alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import { denodeify } from 'rsvp'
import { later } from '@ember/runloop';

export default Component.extend({
  flashMessages: service(),
  router: service(),
  algolia: service(),
  store: service(),
  isEditing: false,
  isDisabled: not(
    'model.permissions.write',
  ),
  mt: null,
  hasMt: false,
  sortedAppearances: [],
  didReceiveAttrs: function() {
    this._super(...arguments);
    this.setAppearances();
  },
  setAppearances: function() {
    const that = this;
    this.get('model.appearances')
      .then(function(appearances) {
        appearances.map(function(appearance) {
          if (appearance.num === 0) {
            console.log(appearance);
            that.set('mt', appearance);
            that.set('hasMt', true);
          }
        });
        appearances = appearances.toSorted(function(a, b) {
          return a.num < b.num ? -1 : 1;
        });
        that.set('sortedAppearances', appearances);
      });
  },
  sortedAppearancesProperties: [
    'num',
  ],
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
      this.setAppearances();
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
      const that = this;
      itemModels.forEach(function(item, index) {
        item.set('num', index + 1);
        item.save();
      });
      later(() => {
        that.setAppearances();
      }, 1000);
      this.flashMessages.success('Success');
    },
  }
});


