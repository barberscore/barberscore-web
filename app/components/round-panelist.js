import Component from '@ember/component';
import { sort } from '@ember/object/computed';
import { task } from 'ember-concurrency';

export default Component.extend({
  deletePanelist: task(function *(panelist) {
    try {
      yield panelist.destroyRecord();
      this.get('flashMessages').success("Deleted!");
    } catch(e) {
      this.get('flashMessages').danger("Problem!");
    }
  }).drop(),
  sortedPanelistsProperties: [
    'categorySort',
    'kindSort',
    'personSort',
  ],
  sortedPanelists: sort(
    'model.round.panelists',
    'sortedPanelistsProperties',
  ),
});
