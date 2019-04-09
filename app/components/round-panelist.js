import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { sort } from '@ember/object/computed';
import { task } from 'ember-concurrency';

export default Component.extend({
  router: service(),
  deletePanelist: task(function *(panelist) {
    try {
      yield panelist.destroyRecord();
      this.flashMessages.success("Deleted!");
    } catch(e) {
      this.flashMessages.danger("Problem!");
    }
  }).drop(),
  sortedPanelistsProperties: [
    'kindSort',
    'num',
    'categorySort',
    'personSort',
  ],
  sortedPanelists: sort(
    'model.round.panelists',
    'sortedPanelistsProperties'
  ),
});
