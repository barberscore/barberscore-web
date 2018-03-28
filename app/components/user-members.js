import Component from '@ember/component';
import { sort, filterBy } from '@ember/object/computed';

export default Component.extend({
  sortedMembersProperties: [
    'groupKind',
    'groupName',
  ],
  activeGroups: filterBy(
    'model.person.members',
    'groupStatus',
    'Active',
  ),
  activeMembers: filterBy(
    'activeGroups',
    'status',
    'Active',
  ),
  sortedMembers: sort(
    'activeMembers',
    'sortedMembersProperties'
  ),
});
