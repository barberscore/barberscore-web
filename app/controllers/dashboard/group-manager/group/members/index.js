import { not, filterBy, sort } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  isDisabled: not(
    'model.permissions.write',
  ),
  sortedMembersProperties: [
    'statusSort',
    'personLast',
    'nomen',
  ],
  filteredMembers: filterBy(
    'model.members',
    'status',
    'Active',
  ),
  sortedMembers: sort(
    'filteredMembers',
    'sortedMembersProperties'
  ),
  actions: {
    createMember(){
      this.transitionToRoute('dashboard.group-manager.group.members.new');
    },
  }
});
