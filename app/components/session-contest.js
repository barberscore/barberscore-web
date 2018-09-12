import Component from '@ember/component';
import { sort, filterBy } from '@ember/object/computed';

export default Component.extend({
  contestantSortProperties: [
    'groupName:asc',
  ],
  filteredContestants: filterBy(
    'model.contestants',
    'status',
    'Included'
  ),
  sortedContestants: sort(
    'filteredContestants',
    'contestantSortProperties'
  ),
  sortedContestsProperties: [
    'isPrimary:desc',
    'groupKindSort',
    'awardQualifier',
    'awardAgeSort',
    'awardName',
  ],
  sortedContests: sort(
    'model.session.contests',
    'sortedContestsProperties'
  ),
});
