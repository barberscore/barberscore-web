import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { not, sort } from '@ember/object/computed';
import { task, timeout } from 'ember-concurrency';
import { denodeify } from 'rsvp'

export default Component.extend({
  store: service(),
  algolia: service(),
  customCollapsed: true,
  isDisabled: not(
    'model.permissions.write',
  ),
  sortedRepertoriesProperties: [
    'nomen',
  ],
  sortedRepertories: sort(
    'model.repertories',
    'sortedRepertoriesProperties'
  ),
  flashMessages: service(),
  searchChart: task(function* (term){
    yield timeout(600);
    let func = denodeify(this.get('algolia').search.bind(this.get('algolia')))
    let res = yield func({ indexName: 'Chart', query: term})
    return res.hits
  }),
  deleteRepertory: task(function *(repertory) {
    try {
      yield repertory.destroyRecord();
      this.get('flashMessages').success("Deleted!");
    } catch(e) {
      this.get('flashMessages').danger("Problem!");
    }
  }).drop(),
  createRepertoryModal: false,
  createRepertoryModalError: false,
  saveRepertory: task(function* (c){
    try {
      let chart = yield this.get('store').findRecord('chart', c.objectID)
      let repertory = yield this.get('store').createRecord('repertory', {
        chart: chart,
        group: this.get('model'),
      }).save();
      yield repertory.activate({
        'by': this.get('currentUser.user.id'),
      });
      this.get('model').reload();
      this.set('createRepertoryModal', false);
      this.set('createRepertoryModalError', false);
      this.get('flashMessages').success("Created!");
      // this.get('router').transitionTo('dashboard.group-manager.group.repertories.repertory', this.get('model'), repertory.get('id'));
    } catch(e) {
      e.errors.forEach((e) => {
        this.set('createRepertoryModalError', true);
        this.get('flashMessages').danger(e.detail);
      })
    }
  }).drop(),
  actions: {
    cancelRepertory(repertory){
      repertory.deleteRecord();
    },
  }
});
