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
        status: 'Active',
        group: this.get('model'),
      });
      this.set('repertory', repertory);
      this.set('openModal', true);
    },
    createChart() {
      let repertory = this.get('store').createRecord('repertory', {
        group: this.get('model'),
      });
      this.set('repertory', repertory);
      let chart = this.get('store').createRecord('chart', {
      });
      this.set('chart', chart);
      this.set('openChartModal', true);
    },
  },
});
