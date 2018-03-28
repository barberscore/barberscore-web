import Component from '@ember/component';
import { sort, filterBy } from '@ember/object/computed';

export default Component.extend({
  filteredAssignments: filterBy(
    'model',
    'status',
    'Active',
  ),
  sortProperties: [
    'conventionStart',
    'kindSort',
    'categorySort',
  ],
  sortedAssignments: sort(
    'filteredAssignments',
    'sortProperties'
  ),
});
