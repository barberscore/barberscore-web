import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo} from 'ember-data/relationships';
const {computed} = Ember;

export default Model.extend({
  name: attr('string'),
  status: attr('score-status'),
  kind: attr('score-kind'),
  category: attr('score-category'),
  points: attr('number'),
  original: attr('number'),
  violation: attr('score-violation'),
  penalty: attr('number'),

  song: belongsTo('song', {async: true}),
  judge: belongsTo('judge', {async: true}),

  lowReview: computed(
    'song.ascSortedScores',
    function() {
      var ultimate = this.get('song.ascSortedScores').objectAt(0);
      var penultimate = this.get('song.ascSortedScores').objectAt(1);
      if (penultimate && ultimate) {
        if (
          (penultimate.get('points') - ultimate.get('points') > 5) &&
          (ultimate.get('points') === this.get('points'))
        ) {
          return true;
        } else {
          return false;
        }
      } else {
          return false;
      }
  }),
  highReview: computed(
    'song.descSortedScores',
    function() {
      var ultimate = this.get('song.descSortedScores').objectAt(0);
      var penultimate = this.get('song.descSortedScores').objectAt(1);
      if (penultimate && ultimate) {
        if (
          (ultimate.get('points') - penultimate.get('points') > 5) &&
          (ultimate.get('points') === this.get('points'))
        ) {
          return true;
        } else {
          return false;
        }
      } else {
          return false;
      }
  }),
  notEmptyPoints: computed.notEmpty(
    'points'
  ),
});
