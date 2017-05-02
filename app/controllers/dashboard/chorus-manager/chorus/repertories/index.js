import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  flashMessage: Ember.get(this, 'flashMessages'),
  openModal: false,
  sortedRepertoriesProperties: [
    'nomen',
  ],
  filteredRepertories: Ember.computed.filterBy(
    'model.repertories',
    'isOld'
  ),
  sortedRepertories: Ember.computed.sort(
    'filteredRepertories',
    'sortedRepertoriesProperties'
  ),
  actions: {
    createRepertory() {
      let repertory = this.get('store').createRecord('repertory', {
        entity: this.get('model'),
        status: 'Valid'
      });
      this.set('repertory', repertory);
      this.set('openModal', true);
    },
    createChart() {
      let chart = this.get('store').createRecord('chart', {
        entity: this.get('model')
      });
      this.set('chart', chart);
      this.set('openChartModal', true);
    },
  },
});
