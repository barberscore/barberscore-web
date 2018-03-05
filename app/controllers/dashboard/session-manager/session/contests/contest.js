import { sort, filterBy } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
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
