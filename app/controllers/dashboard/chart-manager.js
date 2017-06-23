import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  currentUser: Ember.inject.service('current-user'),
  flashMessages: Ember.inject.service(),
  openModal: false,
  sortProperties: [
    'statusSort',
    'nomen',
  ],
  sortedItems: Ember.computed.sort(
    'model',
    'sortProperties'
  ),
  searchChart: task(function* (term){
    yield timeout(600);
    return this.get('store').query('chart', {
      'nomen__icontains': term,
      'page_size': 1000
      })
      .then((data) => data);
  }),
  actions: {
    transitionChart(selected) {
      this.transitionToRoute('dashboard.chart-manager.chart', selected);
    },
    createChart() {
      this.transitionToRoute('dashboard.chart-manager.new');
    },
  }
});
