import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';

export default Controller.extend({
  sortedAssignmentsProperties: [
    'kindSort',
    'categorySort',
    'lastName',
    'firstName',
  ],
  sortedAssignments: sort(
    'model.session.assignments',
    'sortedAssignmentsProperties'
  ),
});
