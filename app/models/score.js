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
  isReview: Ember.computed('song.pointsSorted', function() {
    var ultimate = this.get('song.pointsSorted')[0];
    var penultimate = this.get('song.pointsSorted')[1];
    if (
      (penultimate.get('points') - ultimate.get('points') > 5) &&
      (ultimate.get('points') === this.get('points'))
    ) {
      return true;
    } else {
      return false;
    }
  }),
});
