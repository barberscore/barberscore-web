import Component from '@ember/component';
import { sort, filterBy } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Component.extend({
  flashMessages: service(),
  isEditing: false,
  mt: filterBy(
    'model.appearances',
    'draw',
    0,
  ),
  appearanceSortProperties: [
    'draw:asc',
  ],
  drawnFilter: filterBy(
    'model.appearances',
    'isDrawn',
  ),
  filteredAppearances: filterBy(
    'drawnFilter',
    'status',
    'Verified'
  ),
  sortedAppearances: sort(
    'drawnFilter',
    'appearanceSortProperties'
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
      this.sortedAppearances.invoke('save');
      this.set('isSorting', false);
      this.flashMessages.success('Success');
    }
  }
});
