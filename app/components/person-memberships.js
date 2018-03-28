import Component from '@ember/component';
import { sort } from '@ember/object/computed';

export default Component.extend({
  sortedMembersProperties: [
    'categorySort',
    'kindSort',
    'personSort',
  ],
  sortedMembers: sort(
    'model.members',
    'sortedMembersProperties'
  ),
});
