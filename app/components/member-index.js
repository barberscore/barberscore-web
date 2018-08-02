import Component from '@ember/component';
import { sort } from '@ember/object/computed';

export default Component.extend({
  sortProperties: [
    'groupKind',
    'groupName',
  ],
  sortedMembers: sort(
    'model',
    'sortProperties'
  ),
});
