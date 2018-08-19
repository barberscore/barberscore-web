import Component from '@ember/component';
import { sort } from '@ember/object/computed';

export default Component.extend({
  sortProperties: [
    'groupKind',
    'groupName',
  ],
  collapsedNote: true,
  sortedMembers: sort(
    'model',
    'sortProperties'
  ),
});
