import Ember from 'ember';

export default Ember.Controller.extend({
  sortedRoundsProperties: [
    'sessionConventionStartDate',
    'kindSort',
  ],
  sortedRounds: Ember.computed.sort(
    'model',
    'sortedRoundsProperties'
  ),
});
