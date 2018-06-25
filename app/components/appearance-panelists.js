import Component from '@ember/component';
import { A } from '@ember/array';
import { computed } from '@ember/object';
import { sort, mapBy, filterBy } from '@ember/object/computed';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),
  sortedPanelistsProperties: [
    'category',
    'kind',
  ],
  sortedPanelists: sort(
    'model.round.panelists',
    'sortedPanelistsProperties'
  ),
  // sortedScoresProperties: [
  //   'category',
  //   'kind',
  //   'panelistName',
  //   'songNum',
  // ],
  // officialScores: filterBy(
  //   'scoresCall',
  //   'kind',
  //   'Official',
  // ),
  // officialSortedScores: sort(
  //   'officialScores',
  //   'sortedScoresProperties'
  // ),
  // officialMappedScores: mapBy(
  //   'officialSortedScores',
  //   'points'
  // ),
  // officialSumScores: computed(
  //   'officialMappedScores', function() {
  //     let out = 0;
  //     this.get('officialMappedScores').forEach(function(item) {
  //       out += parseInt(item);
  //     });
  //     return out;
  // }),
  // allSortedScores: sort(
  //   'scoresCall',
  //   'sortedScoresProperties'
  // ),
  // allMappedScores: mapBy(
  //   'allSortedScores',
  //   'points'
  // ),
  // allSumScores: computed(
  //   'allMappedScores', function() {
  //     let out = 0;
  //     this.get('allMappedScores').forEach(function(item) {
  //       out += parseInt(item);
  //     });
  //     return out;
  // }),
  // scoresVariance: mapBy(
  //   'scoresCall',
  //   'hasVariance'
  // ),
  // hasVariance: computed(
  //   'scoresVariance', function() {
  //     return this.get('scoresVariance').any(
  //       function(item) {
  //         return item;
  //       });
  // }),
  // saveScores: task(function *() {
  //   // yield this.get('sortedScores').forEach(function(score) {
  //   //   console.log(score);
  //   //   score.save();
  //   // })
  //   yield this.get('allSortedScores').invoke('save');
  //   this.get('flashMessages').success("Saved!");
  // }).drop(),
});
