import Ember from 'ember';
import Model from 'ember-data/model';
import DS from 'ember-data';
const {computed} = Ember;

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
  ascSortedScores: Ember.computed.sort(
    'scores',
    'ascSortProperties'
  ),

  descSortProperties: ['points:desc',],
  descSortedScores: Ember.computed.sort(
    'scores',
    'descSortProperties'
  ),

  noVariance: computed(
    'scores.@each.hasVariance',
    function() {
      return this.get('scores').isAny('hasVariance');
    }
  ),

  populatedScores: Ember.computed.filterBy(
    'scores',
    'notEmptyPoints'
  ),

  totScores: Ember.computed.filterBy(
    'populatedScores',
    'kind',
    'Official'
  ),
  perScores: Ember.computed.filterBy(
    'totScores',
    'category',
    'Performance'
  ),
  musScores: Ember.computed.filterBy(
    'totScores',
    'category',
    'Music'
  ),
  sngScores: Ember.computed.filterBy(
    'totScores',
    'category',
    'Singing'
  ),

  totRawPoints: computed.mapBy(
    'totScores',
    'points'
  ),
  totPointsCP: computed.sum(
    'totRawPoints'
  ),
  totCount: computed.alias(
    'totRawPoints.length'
  ),
  totScoreCP: Ember.computed(
    'totPoints',
    'totCount',
    function() {
        return (this.get('totPoints') / this.get('totCount')).toFixed(1);
      }
   ),

  musScoresPoints: computed.mapBy(
    'musScores',
    'points'
  ),
  musPointsCP: computed.sum(
    'musScoresPoints'
  ),
  musCount: computed.alias(
    'musScoresPoints.length'
  ),
  musScoreCP: Ember.computed(
    'musPoints',
    'musCount',
    function() {
        return (this.get('musPoints') / this.get('musCount')).toFixed(1);
      }
   ),

  perScoresPoints: computed.mapBy(
    'perScores',
    'points'
  ),
  perPointsCP: computed.sum(
    'perScoresPoints'
  ),
  perCount: computed.alias(
    'perScoresPoints.length'
  ),
  perScoreCP: Ember.computed(
    'perPoints',
    'perCount',
    function() {
        return (this.get('perPoints') / this.get('perCount')).toFixed(1);
      }
   ),

  sngScoresPoints: computed.mapBy(
    'sngScores',
    'points'
  ),
  sngPointsCP: computed.sum(
    'sngScoresPoints'
  ),
  sngCount: computed.alias(
    'sngScoresPoints.length'
  ),
  sngScoreCP: Ember.computed(
    'sngPoints',
    'sngCount',
    function() {
        return (this.get('sngPoints') / this.get('sngCount')).toFixed(1);
      }
   ),
});
