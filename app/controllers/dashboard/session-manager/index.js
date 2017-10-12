import { uniq, sort } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  sortProperties: [
    'statusSort:asc',
    'organizationKindSort:asc',
    'nomen:asc',
  ],
  uniqueSessions: uniq(
    'model',
  ),
  sortedSessions: sort(
    'uniqueSessions',
    'sortProperties'
  ),
  actions: {
    sortBy(sortProperties) {
      this.set('sortProperties', [sortProperties]);
    },
  }
});
