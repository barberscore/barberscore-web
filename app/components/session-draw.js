import Component from '@ember/component';
import { sort, filterBy } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Component.extend({
  flashMessages: service(),
  isEditing: false,
  entrySortProperties: [
    'draw:asc',
  ],
  sortedEntries: sort(
    'filteredEntries',
    'entrySortProperties'
  ),
  filteredEntries: filterBy(
    'model.entries',
    'status',
    'Approved'
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
      this.get('flashMessages').success('Success');
    },
    saveOrder() {
      this.get('sortedEntries').invoke('save');
      this.set('isSorting', false);
      this.get('flashMessages').success('Success');
    }
  }
});
