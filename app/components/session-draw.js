import Component from '@ember/component';
import { sort, filterBy } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  flashMessages: service(),
  isEditing: false,
  entrySortProperties: [
    'draw:asc',
  ],
  mt: null,
  notMt: null,
  filteredEntries: filterBy(
    'notMt',
    'status',
    'Approved'
  ),
  sortedEntries: computed('model.entries.@each.id', function() {
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
    });
    return this.get('model.entries');
  }),
  actions: {
    toggleDraw(){
      this.toggleProperty('isEditing');
    },
    reorderItems(itemModels) {
      itemModels.forEach(function(item, index) {
        item.set('draw', index + 1);
      });
      itemModels.invoke('save');
      this.flashMessages.success('Success');
    },
  }
});
