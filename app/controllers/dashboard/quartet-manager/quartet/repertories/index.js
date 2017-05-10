import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),
  openModal: false,
  searchChart: task(function* (term){
    yield timeout(600);
    return this.get('store').query('chart', {
      'nomen__icontains': term,
      'page_size': 1000
      })
      .then((data) => data);
  }),
  sortedRepertoriesProperties: [
    'nomen',
  ],
  filteredRepertories: Ember.computed.filterBy(
    'model.repertories',
    'isValid'
  ),
  sortedRepertories: Ember.computed.sort(
    'model.repertories',
    'sortedRepertoriesProperties'
  ),
  actions: {
    deleteRepertory(repertory) {
      repertory.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
      });
    },
    createRepertory() {
      let repertory = this.get('store').createRecord('repertory', {
        entity: this.get('model'),
      });
      this.set('openModal', true);
      this.set('repertory', repertory);
    },
    clearRepertory() {
      this.set('chart', null);
      this.set('openModal', false);
    }
  },
});
