import Ember from 'ember';

export default Ember.Controller.extend({
  isDisabled: Ember.computed.not(
    'model.permissions.write',
  ),
  sortedMembersProperties: [
    'statusSort',
    'partSort',
    'nomen',
  ],
  sortedMembers: Ember.computed.sort(
    'model.members',
    'sortedMembersProperties'
  ),
  actions: {
    createMember(){
      this.transitionToRoute('dashboard.group-manager.group.members.new');
    },
  }
});
