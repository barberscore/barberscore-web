import Ember from 'ember';

export default Ember.Controller.extend({
  assignmentSortProperties: [
    'categorySort:asc',
    'kindSort:asc',
    'person.name:asc',
  ],
  sortedAssignments: Ember.computed.sort(
    'model.assignments',
    'assignmentSortProperties'
  ),
  actions: {
    createAssignment() {
      this.transitionToRoute('dashboard.convention-manager.convention.assignments.new');
    },
  },
});
