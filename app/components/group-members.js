import { not, filterBy, sort } from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
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
