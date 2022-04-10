import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { sort} from '@ember/object/computed';
import { task, timeout } from 'ember-concurrency';
import { denodeify } from 'rsvp'

export default Component.extend({
  store: service(),
  algolia: service(),
  currentUser: service(),
  customCollapsed: true,
  customCollapsed2: true,
  customCollapsed4: true,
  customCollapsed5: true,
  sortedRepertoriesProperties: [
    'title',
  ],
  sortedRepertories: sort(
    'model.charts',
    'sortedRepertoriesProperties'
  ),
  flashMessages: service(),
  searchChart: task(function* (term){
    yield timeout(600);
    let func = denodeify(this.algolia.search.bind(this.algolia))
    let res = yield func({ indexName: 'Chart', query: term})
    return res.hits
  }),
  createRepertoryModal: false,
  createRepertoryModalError: false,
  deleteRepertoryModal: false,
  deleteRepertoryModalError: false,
  saveRepertory: task(function* (obj){
    try {
      let group = yield this.model;
      let chart = yield this.store.findRecord('chart', obj.objectID);
      group.get('charts').pushObject(chart);
      yield group.save();
      this.set('createRepertoryModal', false);
      this.set('createRepertoryModalError', false);
      this.flashMessages.success("Created!");
    } catch(e) {
      e.errors.forEach((e) => {
        this.set('createRepertoryModalError', true);
        this.flashMessages.danger(e.detail);
      })
    }
  }).drop(),
  deleteRepertory: task(function *(repertory) {
    try {
      let group = yield this.model;
      group.get('charts').removeObject(repertory);
      yield group.save();
      this.set('deleteRepertoryModal', false);
      this.set('deleteRepertoryModalError', false);
      this.flashMessages.success("Removed!");
    } catch(e) {
        this.set('deleteRepertoryModalError', true);
      this.flashMessages.danger("Problem!");
    }
  }).drop(),
});
