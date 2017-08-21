import Ember from 'ember';

export default Ember.Controller.extend({
  isDisabled: Ember.computed.not(
    'model.permissions.write',
  ),
  sortedMembersProperties: [
    'statusSort',
    'personLast',
    'nomen',
  ],
  filteredMembers: Ember.computed.filterBy(
    'model.members',
    'status',
    'Active',
  ),
  sortedMembers: Ember.computed.sort(
    'filteredMembers',
    'sortedMembersProperties'
  ),
  actions: {
    createMember(){
      this.transitionToRoute('dashboard.group-manager.group.members.new');
    },
  }
});
