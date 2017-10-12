import { sort } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  sortedMembersProperties: [
    'groupStatus',
    'groupKind',
    'groupName',
  ],
  sortedMembers: sort(
    'model',
    'sortedMembersProperties'
  ),
});
