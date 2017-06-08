import Ember from 'ember';
import Model from 'ember-data/model';
import DS from 'ember-data';
const {computed} = Ember;

export default Model.extend({
  nomen: DS.attr('string'),
  status: DS.attr('score-status'),
  kind: DS.attr('score-kind'),
  category: DS.attr('score-category'),
  num: DS.attr('number'),
  points: DS.attr('number'),
  original: DS.attr('number'),
  violation: DS.attr('score-violation'),
  penalty: DS.attr('number'),
  is_flagged: DS.attr('boolean'),
  song: DS.belongsTo('song', {async: true}),
  panelist: DS.belongsTo('panelist', {async: true}),
  person: DS.belongsTo('person', {async: true}),
  permissions: DS.attr(),

  statusOptions: [
    'New',
    'Validated',
    'Cleared',
    'Flagged',
    'Revised',
    'Confirmed',
  ],
  categoryOptions: [
    'Music',
    'Performance',
    'Singing',
  ],
  kindOptions: [
    'Official',
    'Practice',
    'Composite',
  ],

  violationOptions: [
    'General',
  ],

  songNum: computed.alias('song.num'),
  lowReview: computed(
    'song.ascSortedScores',
    function() {
      let ultimate = this.get('song.ascSortedScores').objectAt(0);
      let penultimate = this.get('song.ascSortedScores').objectAt(1);
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
  musVar: computed(
    'song.musScore',
    'category',
    'points',
    function() {
      if (this.get('category') ===  'Music' && Math.abs((this.get('points') - this.get('song.musScore'))) > 5) {
        return true;
      } else {
        return false;
      }
    }
  ),
  perVar: computed(
    'song.perScore',
    'category',
    'points',
    function() {
      if (this.get('category') ===  'Performance' && Math.abs((this.get('points') - this.get('song.perScore'))) > 5) {
        return true;
      } else {
        return false;
      }
    }
  ),
  sngVar: computed(
    'song.sngScore',
    'category',
    'points',
    function() {
      if (this.get('category') ===  'Singing' && Math.abs((this.get('points') - this.get('song.sngScore'))) > 5) {
        return true;
      } else {
        return false;
      }
    }
  ),
  hasVariance: computed.or(
    'lowReview',
    'highReview',
    'musVar',
    'perVar',
    'sngVar'
  ),
  hasVarianceClass: computed(
    'is_flagged',
    function() {
      if (this.get('is_flagged')) {
        return 'has-error has-feedback';
      } else {
        return '';
      }
    }
  ),
  slotJudge: computed(
    'num',
    'person.common_name',
    function() {
      return this.get('num') + " - " + this.get('person.common_name');
    }
  ),
});
