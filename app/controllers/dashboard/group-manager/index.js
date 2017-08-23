import Ember from 'ember';

export default Ember.Controller.extend({
  sortedMembersProperties: [
    'groupStatus',
    'groupKind',
    'groupName',
  ],
  sortedMembers: Ember.computed.sort(
    'model',
    'sortedMembersProperties'
  ),
});
