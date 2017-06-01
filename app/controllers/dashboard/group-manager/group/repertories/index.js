import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  openModal: false,
  sortedRepertoriesProperties: [
    'nomen',
  ],
  sortedRepertories: Ember.computed.sort(
    'model.repertories',
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
