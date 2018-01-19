import { sort } from '@ember/object/computed';
import Controller from '@ember/controller';
// import { task, timeout } from 'ember-concurrency';

export default Controller.extend({
  sortedPanelistsProperties: [
    'categorySort',
    'kindSort',
    'personSort',
  ],
  sortedPanelists: sort(
    'model.panelists',
    'sortedPanelistsProperties'
  ),
  sortedAssignmentsProperties: [
    'categorySort',
    'kindSort',
    'personSort',
  ],
  sortedAssignments: sort(
    'model.session.convention.assignments',
    'sortedAssignmentsProperties'
  ),
  actions: {
    createPanelist() {
      this.transitionToRoute('dashboard.scoring-manager.round.panelists.new');
    },
  }
});
