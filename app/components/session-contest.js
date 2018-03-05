import Component from '@ember/component';
import { sort, filterBy } from '@ember/object/computed';

export default Component.extend({
  contestantSortProperties: [
    'nomen:asc',
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
});
