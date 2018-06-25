import Component from '@ember/component';
import { computed } from '@ember/object';
import { sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),
  sortedScoresProperties: [
    'songNum',
  ],
  scoresCall: computed(
    'model',
    'appearance',
    function() {
      return this.get('store').query('score', {
        'panelist': this.get('model.id'),
        'song__appearance': this.get('appearance.id'),
        'page_size': 100
    });
  }),
  sortedScores: sort(
    'scoresCall',
    'sortedScoresProperties'
  ),
});
