import { sort, filterBy } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  sortedAssignmentsProperties: [
    'categorySort',
    'kindSort',
    'personSort',
  ],
  activeAssignments: filterBy(
    'model.convention.assignments',
    'status',
    'Active',
  ),
  sortedAssignments: sort(
    'activeAssignments',
    'sortedAssignmentsProperties'
  ),
});
