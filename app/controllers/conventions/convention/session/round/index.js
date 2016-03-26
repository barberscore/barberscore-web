import Ember from 'ember';

export default Ember.Controller.extend({
  performanceSortProperties: ['slot',],
  sortedPerformances: Ember.computed.sort(
    'model.performances',
    'performanceSortProperties'
  ),
});
