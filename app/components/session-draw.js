import Component from '@ember/component';
import { sort, filterBy } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { later } from '@ember/runloop';

export default Component.extend({
  flashMessages: service(),
  isEditing: false,
  entrySortProperties: [
    'draw:asc',
  ],
  sortedEntries: [],
  mt: null,
  notMt: null,
  filteredEntries: filterBy(
    'notMt',
    'status',
    'Approved'
  ),
  didReceiveAttrs: function() {
    this._super(...arguments);
    this.setEntries();
  },
  setEntries: function() {
    const that = this;
    this.get('model.entries').then(function(entriesObj) {
      let mt = entriesObj.filter(function(item) {
        return item.isMt;
      });
      that.set('mt', mt);
      let notMt = entriesObj.filter(function(item) {
        return item.notMt;
      });
      that.set('notMt', notMt);
      entriesObj = entriesObj.toSorted(function(a, b) {
        return a.draw < b.draw ? -1 : 1;
      });
      that.set('sortedEntries', entriesObj);
    });
  },
  actions: {
    toggleDraw(){
      this.toggleProperty('isEditing');
    },
    reorderItems(itemModels, currentElement) {
      const that = this;
      itemModels.forEach(function(item, index) {
        item.set('draw', index + 1);
        item.save();
      });
      later(() => {
        that.setEntries();
      }, 1000);
      this.flashMessages.success('Success');
    },
  }
});
