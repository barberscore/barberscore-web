import Ember from 'ember';

export default Ember.Controller.extend({
  appearancesSortProperties: [
    'entryRank',
  ],
  sortedAppearances: Ember.computed.sort(
    'model.appearances',
    'appearancesSortProperties'
  ),
});
