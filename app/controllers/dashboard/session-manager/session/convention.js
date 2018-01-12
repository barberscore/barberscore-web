import { sort } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  sortedAssignmentsProperties: [
    'categorySort',
    'kindSort',
    'personSort',
  ],
  sortedAssignments: sort(
    'model.convention.assignments',
    'sortedAssignmentsProperties'
  ),
});
