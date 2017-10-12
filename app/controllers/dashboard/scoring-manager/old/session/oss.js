import { sort, filterBy } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  isRaw: false,
  entrySortProperties: [
    'entryprivate.total_points:desc',
    'entryprivate.sng_points:desc',
    'entryprivate.mus_points:desc',
    'entryprivate.per_points:desc',
  ],
  sortedEntries: sort(
    'model.entries',
    'entrySortProperties'
  ),
  contestSortProperties: [
    'organizationKindSort',
    'awardQualifier',
    'awardPrimary:desc',
    'awardAgeSort',
    'awardName',
  ],
  championshipContests: filterBy(
    'model.contests',
    'is_qualifier',
    false
  ),
  sortedContests: sort(
    'championshipContests',
    'contestSortProperties'
  ),
  actions: {
    letsGo() {
      this.toggleProperty('isRaw');
    },
  },
});
