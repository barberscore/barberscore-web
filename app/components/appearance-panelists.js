import Component from '@ember/component';
import { sort, filterBy } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  store: service(),
  sortedPanelists: [],
  init: function() {
    this._super(...arguments);
    this.setPanelists();
  },
  setPanelists: function() {
    const that = this;
    this.get('model.round.panelists').then(function (panelists) {
      const filteredPanelists = panelists.filter((panelist) => panelist.isScoring);
      filteredPanelists.sort(function(a, b) {
        return a.num < b.num ? -1 : 1;
      });
      that.set('sortedPanelists', filteredPanelists);
    });
  },
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
});
