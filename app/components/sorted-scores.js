import { sort } from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
  sortedScoresProperties: [
    'songNum',
  ],
  sortedScores: sort(
    'scores',
    'sortedScoresProperties'
  ),
});
