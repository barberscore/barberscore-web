import { not, filterBy, sort } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  isDisabled: not(
    'model.permissions.write',
  ),
  sortedMembersProperties: [
    'partSort',
    'personLast',
    'personName',
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
});
