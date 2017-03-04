import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo, hasMany } from 'ember-data/relationships';
const {computed} = Ember;

export default Model.extend({
  nomen: attr('string'),
  status: attr('song-status'),
  num: attr('number'),
  arranger: attr('string'),
  songscore: belongsTo('songscore', {async: true}),
  performance: belongsTo('performance', {async: true}),
  scores: hasMany('score', {async: true}),
  permissions: attr(),

  statusOptions: [
    'New',
    'Validated',
    'Finished',
    'Confirmed',
    'Final',
    'Published',
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
  prsScores: Ember.computed.filterBy(
    'totScores',
    'category',
    'Presentation'
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

  prsScoresPoints: computed.mapBy(
    'prsScores',
    'points'
  ),
  prsPoints: computed.sum(
    'prsScoresPoints'
  ),
  prsCount: computed.alias(
    'prsScoresPoints.length'
  ),
  prsScore: Ember.computed(
    'prsPoints',
    'prsCount',
    function() {
        return (this.get('prsPoints') / this.get('prsCount')).toFixed(1);
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
