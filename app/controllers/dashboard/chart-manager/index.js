import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  queryParams: [
    'page_size',
  ],
  openModal: false,
  page_size: 100,
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
    transitionChart(chart) {
      this.transitionToRoute('dashboard.chart-manager.chart.details', chart);
    },
    createChart(){
      let chart = this.get('store').createRecord('chart', {
        title: this.get('title'),
        arrangers: this.get('arrangers'),
        composers: this.get('composers'),
        holders: this.get('holders'),
      });
      chart.save()
      .then(() => {
        this.set('title', null);
        this.set('arrangers', null);
        this.set('composers', null);
        this.set('holders', null);
        this.set('openModal', false);
        this.get('flashMessages').success('Success');
        this.transitionToRoute('dashboard.chart-manager.chart.details', chart);
      });
    },
    clearChart() {
      this.set('title', null);
      this.set('arrangers', null);
      this.set('composers', null);
      this.set('holders', null);
      this.set('openModal', false);
    },
    deleteChart(chart){
      chart.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
      });
    },
  }
});
