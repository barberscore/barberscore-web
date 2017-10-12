import { sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { task, timeout } from 'ember-concurrency';

export default Controller.extend({
  currentUser: service('current-user'),
  sortProperties: [
    'statusSort',
    'nomen',
  ],
  sortedItems: sort(
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
