import Ember from 'ember';

export default Ember.Controller.extend({
  sortedGroupsProperties: [
    'nomen',
  ],
  sortedGroups: Ember.computed.sort(
    'model',
    'sortedGroupsProperties'
  ),
});
