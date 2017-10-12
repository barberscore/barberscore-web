import { sort } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  assignmentSortProperties: [
    'categorySort:asc',
    'kindSort:asc',
    'personLastName:asc',
  ],
  sortedAssignments: sort(
    'model.assignments',
    'assignmentSortProperties'
  ),
  actions: {
    createAssignment() {
      this.transitionToRoute('dashboard.convention-manager.convention.assignments.new');
    },
  },
});
