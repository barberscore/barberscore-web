import { filterBy, sort } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  filteredRounds: filterBy(
    'model',
    'conventionIsActive'
  ),
  sortedRoundsProperties: [
    'sessionConventionStartDate',
    'sessionKindSort',
    'kindSort:desc',
  ],
  sortedRounds: sort(
    'filteredRounds',
    'sortedRoundsProperties'
  ),
  actions: {
    sortBy(sortedRoundsProperties) {
      this.set('sortedRoundsProperties', [sortedRoundsProperties]);
    },
  }
});
