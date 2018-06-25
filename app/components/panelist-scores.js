import Component from '@ember/component';
import { A } from '@ember/array';
import { computed } from '@ember/object';
import { sort, mapBy, filterBy } from '@ember/object/computed';
import { task } from 'ember-concurrency';
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
