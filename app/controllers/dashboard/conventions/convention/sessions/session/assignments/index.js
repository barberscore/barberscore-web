import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';

export default Controller.extend({
  sortedAssignmentsProperties: [
    'kind',
    'name',
  ],
  sortedAssignments: sort(
    'model.assignments',
    'sortedAssignmentsProperties'
  ),
});
