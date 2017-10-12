import { sort } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    sortEntriesBy(entrySortProperties) {
      this.set('entrySortProperties', [entrySortProperties]);
    },
    penalizeEligibility(entry) {
      entry.penalizeEligibility();
    },
  },
  entrySortProperties: [
    'entry.entryprivate.rank:asc',
    'group.nomen:asc',
  ],
  sortedEntries: sort(
    'model.entries',
    'entrySortProperties'
  ),
});
