import { sort, filterBy } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
// import { task, timeout } from 'ember-concurrency';

export default Controller.extend({
  flashMessages: service(),
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
