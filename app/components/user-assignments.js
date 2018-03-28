import Component from '@ember/component';
import { sort, filterBy } from '@ember/object/computed';

export default Component.extend({
  activeConventions: filterBy(
    'model.person.assignments',
    'conventionStatus',
    'Active',
  ),
  activeAssignments: filterBy(
    'activeConventions',
    'status',
    'Active',
  ),
  sortedAssignmentsProperties: [
    'conventionName',
  ],
  sortedAssignments: sort(
    'activeAssignments',
    'sortedAssignmentsProperties'
  ),
});
