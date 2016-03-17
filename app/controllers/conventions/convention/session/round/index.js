import Ember from 'ember';

export default Ember.Controller.extend({
  performanceSortProperties: ['slot',],
  performancesSorted: Ember.computed.sort(
    'model.performances',
    'performanceSortProperties'
  ),
});
