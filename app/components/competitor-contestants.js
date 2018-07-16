import { sort, filterBy } from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
  contestantSortProperties: [
    'awardSort',
  ],
  filteredContestants: filterBy(
    'model.entry.contestants',
    'status',
    'Included',
  ),
  sortedContestants: sort(
    'filteredContestants',
    'contestantSortProperties'
  ),
});
