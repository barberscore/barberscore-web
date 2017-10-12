import { uniq, sort } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  sortProperties: [
    'statusSort:asc',
    'kindSort:asc',
    'name:asc',
  ],
  uniqueOrganizations: uniq(
    'model',
  ),
  sortedOrganizations: sort(
    'uniqueOrganizations',
    'sortProperties'
  ),
  actions: {
    sortBy(sortProperties) {
      this.set('sortProperties', [sortProperties]);
    },
  }
});
