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
    let kindModel = this.get('model.session.kind');
    let func = denodeify(this.algolia.search.bind(this.algolia))
    let res = yield func({ indexName: 'Group', query: term}, { filters: `get_kind_display:${kindModel}` })
    return res.hits
  }),
  createAppearanceModal: false,
  createAppearanceModalError: false,
  saveAppearance: task(function* (obj, num){
    try {
      let group = yield this.store.findRecord('group', obj.objectID)
      yield this.store.createRecord('appearance', {
        num: num,
        isPrivate: true,
        group: group,
        round: this.model,
        participants: "",
        songs: [],
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


