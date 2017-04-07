import Ember from 'ember';

export default Ember.Controller.extend({
  roundSortProperties: [
    'num:desc',
  ],
  sortedRounds: Ember.computed.sort(
    'model.rounds',
    'roundSortProperties'
  ),
});
