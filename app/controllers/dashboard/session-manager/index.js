import { sort } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  sortProperties: [
    'statusSort:asc',
    'organizationKindSort:asc',
    'nomen:asc',
  ],
  sortedSessions: sort(
    'model',
    'sortProperties'
  ),
  actions: {
    sortBy(sortProperties) {
      this.set('sortProperties', [sortProperties]);
    },
  }
});
