import { sort } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  sortedRoundsProperties: [
    'statusSort',
    'kindSort:desc',
  ],
  sortedRounds: sort(
    'model',
    'sortedRoundsProperties'
  ),
  actions: {
    sortBy(sortedRoundsProperties) {
      this.set('sortedRoundsProperties', [sortedRoundsProperties]);
    },
  }
});
