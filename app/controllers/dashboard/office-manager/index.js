import { sort } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: [
    'kind',
  ],
  kind: null,
  sortProperties: [
    'name',
    'kind',
    'status',
  ],
  sortedItems: sort(
    'model',
    'sortProperties'
  ),
  kindOptions: [
    1,11,32
  ],
  actions: {
    sortBy(sortProperties) {
      this.set('sortProperties', [sortProperties]);
    },
  }
});
