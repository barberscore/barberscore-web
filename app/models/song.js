import Ember from 'ember';
import Model from 'ember-data/model';
import DS from 'ember-data';
const {computed} = Ember;

export default Model.extend({
  nomen: DS.attr('string'),
  status: DS.attr('song-status'),
  num: DS.attr('number'),
  arranger: DS.attr('string'),
  songprivate: DS.belongsTo('songprivate', {async: true}),
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
    'Published',
  ],

  songScoreCall: Ember.computed(
    'scores.@each.id', function() {
      return this.get('scores');
    }
  ),

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
  totPoints: computed.sum(
    'totRawPoints'
  ),
  totCount: computed.alias(
    'totRawPoints.length'
  ),
  totScore: Ember.computed(
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
  musPoints: computed.sum(
    'musScoresPoints'
  ),
  musCount: computed.alias(
    'musScoresPoints.length'
  ),
  musScore: Ember.computed(
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
  perPoints: computed.sum(
    'perScoresPoints'
  ),
  perCount: computed.alias(
    'perScoresPoints.length'
  ),
  perScore: Ember.computed(
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
  sngPoints: computed.sum(
    'sngScoresPoints'
  ),
  sngCount: computed.alias(
    'sngScoresPoints.length'
  ),
  sngScore: Ember.computed(
    'sngPoints',
    'sngCount',
    function() {
        return (this.get('sngPoints') / this.get('sngCount')).toFixed(1);
      }
   ),
});
