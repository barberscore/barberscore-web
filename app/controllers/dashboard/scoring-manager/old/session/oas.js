import { sort } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  roundSortProperties: [
    'num:desc',
  ],
  sortedRounds: sort(
    'model.rounds',
    'roundSortProperties'
  ),
});
