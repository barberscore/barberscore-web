import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  status: DS.attr('score-status'),
  points: DS.attr('number'),
  kind: DS.attr('score-kind'),
  category: DS.attr('score-category'),
  dixon_test: DS.attr('string'),
  asterisk_test: DS.attr('string'),
  song: DS.belongsTo('song', {async: true}),
  judge: DS.belongsTo('judge', {async: true}),
  lowReview: Ember.computed(
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
  highReview: Ember.computed(
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
});
