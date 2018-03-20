import Component from '@ember/component';
import { sort, filterBy } from '@ember/object/computed';

export default Component.extend({
  sortedAssignmentsProperties: [
    'categorySort',
    'kindSort',
    'personSort',
  ],
  activeAssignments: filterBy(
    'model.assignments',
    'status',
    'Active',
  ),
  sortedAssignments: sort(
    'activeAssignments',
    'sortedAssignmentsProperties'
  ),
});
