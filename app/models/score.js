import { alias, notEmpty, or } from '@ember/object/computed';
import { computed } from '@ember/object';
import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  nomen: DS.attr('string'),
  status: DS.attr('score-status'),
  category: DS.attr('score-category'),
  kind: DS.attr('score-kind'),
  num: DS.attr('number'),
  points: DS.attr('number'),
  original: DS.attr('number'),
  // violation: DS.attr('score-violation'),
  penalty: DS.attr('number'),
  isFlagged: DS.attr('boolean'),
  song: DS.belongsTo('song', {async: true}),
  panelist: DS.belongsTo('panelist', {async: true}),
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

  rowClass: computed(
    'kind', function() {
      if (this.get('category') === 'Music') {
        return 'warning';
      } else if (this.get('category') === 'Performance') {
        return 'success';
      } else if (this.get('category') === 'Singing') {
        return 'info';
      } else {
        return null;
      }
    }
  ),

  panelistName: alias('panelist.person.lastName'),
  songNum: alias('song.num'),
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
  notEmptyPoints: notEmpty(
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
  hasVariance: or(
    'lowReview',
    'highReview',
    'musVar',
    'perVar',
    'sngVar'
  ),
  hasVarianceClass: computed(
    'isFlagged',
    function() {
      if (this.get('isFlagged')) {
        return 'has-error has-feedback';
      } else {
        return '';
      }
    }
  ),
  slotJudge: computed(
    'num',
    'person.commonName',
    function() {
      return this.get('num') + " - " + this.get('person.commonName');
    }
  ),
});
