import { filterBy, sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
// import { task, timeout } from 'ember-concurrency';

export default Controller.extend({
  flashMessages: service(),
  isSorting: false,
  advancersSortProperties: [
    'draw:asc',
  ],
  filteredAdvancers: filterBy(
    'model.appearances',
    'isAdvancer'
  ),
  sortedAdvancers: sort(
    'filteredAdvancers',
    'advancersSortProperties'
  ),
  actions: {
    reorderItems(itemModels) {
      itemModels.forEach(function(item, index) {
        item.set('draw', index + 1);
      });
    },
    saveOrder() {
      this.get('sortedAdvancers').invoke('save');
      this.set('isSorting', false);
      this.get('flashMessages').success('Success');
    }
  }
});
