import Ember from 'ember';

export default Ember.Controller.extend({
  appearanceSortProperties: [
    'num:asc',
  ],
  sortedAppearances: Ember.computed.sort(
    'model.appearances',
    'appearanceSortProperties'
  ),
});
