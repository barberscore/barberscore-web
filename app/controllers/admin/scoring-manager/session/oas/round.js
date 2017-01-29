import Ember from 'ember';

export default Ember.Controller.extend({
  performanceSortProperties: [
    'num:asc',
  ],
  sortedPerformances: Ember.computed.sort(
    'model.performances',
    'performanceSortProperties'
  ),
});
