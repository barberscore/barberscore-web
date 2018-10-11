import Component from '@ember/component';
import { sort, filterBy } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Component.extend({
  flashMessages: service(),
  isEditing: false,
  entrySortProperties: [
    'draw:asc',
  ],
  notMt: filterBy(
    'model.entries',
    'notMt',
  ),
  filteredEntries: filterBy(
    'notMt',
    'status',
    'Approved'
  ),
  sortedEntries: sort(
    'filteredEntries',
    'entrySortProperties'
  ),
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
    saveOrder() {
      this.sortedEntries.invoke('save');
      this.set('isSorting', false);
      this.flashMessages.success('Success');
    }
  }
});
