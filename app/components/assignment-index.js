import Component from '@ember/component';
import { sort } from '@ember/object/computed';

export default Component.extend({
  sortProperties: [
    'conventionStart',
    'kindSort',
    'categorySort',
  ],
  sortedAssignments: sort(
    'model',
    'sortProperties'
  ),
});
