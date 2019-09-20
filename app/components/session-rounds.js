import Component from '@ember/component';
import { sort } from '@ember/object/computed';

export default Component.extend({
  sortedRoundsProperties: [
    'num',
  ],
  sortedRounds: sort(
    'model',
    'sortedRoundsProperties'
  ),
});
