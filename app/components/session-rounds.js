import Component from '@ember/component';
import { sort } from '@ember/object/computed';

export default Component.extend({
  sortedRoundsProperties: [
    'statusSort',
    'kindSort:desc',
  ],
  sortedRounds: sort(
    'model.rounds',
    'sortedRoundsProperties'
  ),
});
