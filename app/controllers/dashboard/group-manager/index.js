import Ember from 'ember';

export default Ember.Controller.extend({
  sortedGroupsProperties: [
    'statusSort',
    'name',
  ],
  sortedGroups: Ember.computed.sort(
    'model',
    'sortedGroupsProperties'
  ),
});
