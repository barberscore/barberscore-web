import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Component.extend({
  router: Ember.inject.service("-routing"),
  store: Ember.inject.service(),
  openModal: false,
  searchChart: task(function* (term){
    yield timeout(600);
    return this.get('store').query('chart', {
      'nomen__icontains': term,
      'page_size': 1000
      })
      .then((data) => data);
  }),
  actions: {
    saveRepertory() {
      this.get('model').save()
      .then(() => {
        this.set('openModal', false);
        this.get('flashMessages').success('Saved');
      });
    },
    clearRepertory() {
      this.get('model').deleteRecord();
      this.set('openModal', false);
    }
  },
});
