import Ember from 'ember';

export default Ember.Controller.extend({
  sortedMembersProperties: [
    'groupSort',
  ],
  sortedMembers: Ember.computed.sort(
    'model',
    'sortedMembersProperties'
  ),
});
