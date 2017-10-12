import { sort, filterBy, mapBy, sum, alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  // Fields
  nomen: DS.attr('string'),
  status: DS.attr('song-status'),
  num: DS.attr('number'),
  rank: DS.attr('number'),
  musPoints: DS.attr('number'),
  perPoints: DS.attr('number'),
  sngPoints: DS.attr('number'),
  totPoints: DS.attr('number'),
  musScore: DS.attr('number'),
  perScore: DS.attr('number'),
  sngScore: DS.attr('number'),
  totScore: DS.attr('number'),
  appearance: DS.belongsTo('appearance', {async: true}),
  chart: DS.belongsTo('chart', {async: true}),
  scores: DS.hasMany('score', {async: true}),
  permissions: DS.attr(),

  statusOptions: [
    'New',
    'Validated',
    'Finished',
    'Confirmed',
    'Final',
    'Announced',
  ],


  ascSortProperties: ['points:asc',],
  ascSortedScores: sort(
    'scores',
    'ascSortProperties'
  ),

  descSortProperties: ['points:desc',],
  descSortedScores: sort(
    'scores',
    'descSortProperties'
  ),

  noVariance: computed(
    'scores.@each.hasVariance',
    function() {
      return this.get('scores').isAny('hasVariance');
    }
  ),

  populatedScores: filterBy(
    'scores',
    'notEmptyPoints'
  ),

  totScores: filterBy(
    'populatedScores',
    'kind',
    'Official'
  ),
  perScores: filterBy(
    'totScores',
    'category',
    'Performance'
  ),
  musScores: filterBy(
    'totScores',
    'category',
    'Music'
  ),
  sngScores: filterBy(
    'totScores',
    'category',
    'Singing'
  ),

  totRawPoints: mapBy(
    'totScores',
    'points'
  ),
  totPointsCP: sum(
    'totRawPoints'
  ),
  totCount: alias(
    'totRawPoints.length'
  ),
  totScoreCP: computed(
    'totPoints',
    'totCount',
    function() {
        return (this.get('totPoints') / this.get('totCount')).toFixed(1);
      }
   ),

  musScoresPoints: mapBy(
    'musScores',
    'points'
  ),
  musPointsCP: sum(
    'musScoresPoints'
  ),
  musCount: alias(
    'musScoresPoints.length'
  ),
  musScoreCP: computed(
    'musPoints',
    'musCount',
    function() {
        return (this.get('musPoints') / this.get('musCount')).toFixed(1);
      }
   ),

  perScoresPoints: mapBy(
    'perScores',
    'points'
  ),
  perPointsCP: sum(
    'perScoresPoints'
  ),
  perCount: alias(
    'perScoresPoints.length'
  ),
  perScoreCP: computed(
    'perPoints',
    'perCount',
    function() {
        return (this.get('perPoints') / this.get('perCount')).toFixed(1);
      }
   ),

  sngScoresPoints: mapBy(
    'sngScores',
    'points'
  ),
  sngPointsCP: sum(
    'sngScoresPoints'
  ),
  sngCount: alias(
    'sngScoresPoints.length'
  ),
  sngScoreCP: computed(
    'sngPoints',
    'sngCount',
    function() {
        return (this.get('sngPoints') / this.get('sngCount')).toFixed(1);
      }
   ),
});
