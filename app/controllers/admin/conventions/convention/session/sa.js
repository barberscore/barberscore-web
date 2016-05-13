import Ember from 'ember';

export default Ember.Controller.extend({
  isRaw: false,
  performerSortProperties: ['total_points:desc',],
  sortedPerformers: Ember.computed.sort(
    'model.performers',
    'performerSortProperties'
  ),
  panelSort: ['designation:asc',],
  sortedPanel: Ember.computed.sort(
    'model.judges',
    'panelSort'
  ),
  actions: {
    letsGo() {
      this.toggleProperty('isRaw');
    },
  },
});
