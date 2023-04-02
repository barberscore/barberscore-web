import Component from '@ember/component';
import { sort, filterBy } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  store: service(),
  isDisabled: computed('model.round.status', function() {
    if (this.get('model.round.status') == 'Published') {
      return true;
    }
    return false;
  }),
  sortedPanelistsProperties: [
    'kindSort',
    'categorySort',
    'num',
  ],
  filteredPanelists: filterBy(
    'model.round.panelists',
    'isScoring',
  ),
  sortedPanelists: sort(
    'filteredPanelists',
    'sortedPanelistsProperties'
  ),
});
