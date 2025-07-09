import { alias, filterBy } from '@ember/object/computed';
import { computed } from '@ember/object';

import Component from '@ember/component';

export default Component.extend({
  entriesCount: {
    New: 0,
    Built: 0,
    Invited: 0,
    Submitted: 0,
    Withdrawn: 0,
    Approved: 0,
    total: 0
  },
  allEntries: [],
  didReceiveAttrs: function() {
    this._super(...arguments);
    this.setEntriesCount();
  },
  setEntriesCount: function() {
    const that = this;
    this.get('model.entries').then(function(entriesObj) {
      const entries = {
        New: 0,
        Built: 0,
        Invited: 0,
        Submitted: 0,
        Withdrawn: 0,
        Approved: 0,
        total: 0
      };
      entriesObj.map(function(item) {
        var existingValue = entries[item.status] || 0;
        entries[item.status] = existingValue + 1;
        entries.total += 1;
      });
      that.set('entriesCount', entries);
    });
  }
});
