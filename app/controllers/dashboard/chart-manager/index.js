import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  openModal: false,
  sortProperties: [
    'title',
    'bhs_id',
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
    sortBy(sortProperties) {
      this.set('sortProperties', [sortProperties]);
    },
    transitionChart(selected) {
      this.transitionToRoute('dashboard.chart-manager.chart.details', selected);
    },
    createChart() {
      // let chart = this.get('store').createRecord('chart', {
      // });
      // this.set('chart', chart);
      this.set('openModal', true);
    },
    deleteChart(chart){
      chart.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
      });
    },
  }
});
