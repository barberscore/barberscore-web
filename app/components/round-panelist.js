import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { sort } from '@ember/object/computed';
import { task } from 'ember-concurrency';

export default Component.extend({
  router: service(),
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
