import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo} from 'ember-data/relationships';
const {computed} = Ember;

export default Model.extend({
  nomen: attr('string'),
  status: attr('score-status'),
  kind: attr('score-kind'),
  category: attr('score-category'),
  points: attr('number'),
  original: attr('number'),
  violation: attr('score-violation'),
  penalty: attr('number'),
  is_flagged: attr('boolean'),
  song: belongsTo('song', {async: true}),
  person: belongsTo('person', {async: true}),
  permissions: attr(),

  lowReview: computed(
    'song.ascSortedScores',
    function() {
      if (false) {
        return false;
      } else {
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
      }
  }),
  highReview: computed(
    'song.descSortedScores',
    function() {
      if (false) {
        return false;
      } else {
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
      if (false) {
        return false;
      } else if (this.get('category') ===  'Music' && Math.abs((this.get('points') - this.get('song.musScore'))) > 5) {
        return true;
      } else {
      } return false;
    }
  ),
  prsVar: computed(
    'song.prsScore',
    'category',
    'points',
    function() {
      if (false) {
        return false;
      } else if (this.get('category') ===  'Presentation' && Math.abs((this.get('points') - this.get('song.prsScore'))) > 5) {
        return true;
      } else {
      } return false;
    }
  ),
  sngVar: computed(
    'song.sngScore',
    'category',
    'points',
    function() {
      if (false) {
        return false;
      } else if (this.get('category') ===  'Singing' && Math.abs((this.get('points') - this.get('song.sngScore'))) > 5) {
        return true;
      } else {
      } return false;
    }
  ),
  hasVariance: computed.or(
    'lowReview',
    'highReview',
    'musVar',
    'prsVar',
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
});
