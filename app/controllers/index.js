import { sort } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  sortedRoundsProperties: [
    'sessionConventionStartDate',
    'kindSort',
  ],
  sortedRounds: sort(
    'model',
    'sortedRoundsProperties'
  ),
});
