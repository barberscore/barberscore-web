import Component from '@ember/component';
import { sort, filterBy } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),
  sortedPanelistsProperties: [
    'category',
    'kind',
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
