import Component from '@ember/component';
import { A } from '@ember/array';
import { computed } from '@ember/object';
import { sort, mapBy, sum } from '@ember/object/computed';

export default Component.extend({
  scoresCall: computed(
    'appearance.songs', function() {
    let out = A();
    this.get('appearance.songs').then((songs) => {
      songs.forEach(function(song) {
        song.get('scores').forEach(function(score) {
          out.pushObject(score);
        });
      });
    });
    return out;
  }), 
  sortedPanelistsProperties: [
    'kind',
  ],
  sortedPanelists: sort(
    'model.round.panelists',
    'sortedPanelistsProperties'
  ),
  sortedScoresProperties: [
    'category',
    'kind',
    'panelistName',
    'songNum',
  ],
  sortedScores: sort(
    'scoresCall',
    'sortedScoresProperties'
  ),
  mappedScores: mapBy(
    'sortedScores',
    'points'
  ),
  sumScores: sum(
    'mappedScores'
  ),
  scoresVariance: mapBy(
    'scoresCall',
    'hasVariance'
  ),
  hasVariance: computed(
    'scoresVariance', function() {
      return this.get('scoresVariance').any(
        function(item) {
          return item;
        });
  })
});
