import { sort } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  roundSortProperties: [
    'num:asc',
  ],
  sortedRounds: sort(
    'model.rounds',
    'roundSortProperties'
  ),
});
