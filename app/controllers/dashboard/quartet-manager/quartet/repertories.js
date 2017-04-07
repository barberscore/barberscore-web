import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  flashMessage: Ember.get(this, 'flashMessages'),
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
  sortedRepertories: Ember.computed.sort(
    'model.repertories',
    'sortedRepertoriesProperties'
  ),
  actions: {
    deleteRepertory(repertory) {
      repertory.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
    createRepertory() {
      let repertory = this.get('store').createRecord('repertory', {
        entity: this.get('model'),
        chart: this.get('chart'),
      });
      repertory.save()
      .then(() => {
        this.set('chart', null);
        this.set('openModal', false);
        this.get('flashMessages').success('Saved');
      })
      .catch(() => {
        repertory.deleteRecord(),
        this.set('openModal', false);
        this.get('flashMessages').danger('Error');
      });
    },
    clearRepertory() {
      this.set('chart', null);
      this.set('openModal', false);
    }
  },
});
