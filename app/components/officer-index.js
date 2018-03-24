import Component from '@ember/component';
import { sort } from '@ember/object/computed';

export default Component.extend({
  collapsedNote: true,
  sortedOfficersProperties: [
    'groupSort',
    'groupName',
  ],
  sortedOfficers: sort(
    'model',
    'sortedOfficersProperties'
  ),
});
