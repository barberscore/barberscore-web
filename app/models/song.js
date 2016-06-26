import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo, hasMany } from 'ember-data/relationships';
const {computed} = Ember;

export default Model.extend({
  name: attr('string'),
  status: attr('song-status'),
  num: attr('number'),
  arranger: attr('string'),
  mus_points: attr('number'),
  prs_points: attr('number'),
  sng_points: attr('number'),
  total_points: attr('number'),
  mus_score: attr('number'),
  prs_score: attr('number'),
  sng_score: attr('number'),
  total_score: attr('number'),
  submission: belongsTo('submission', {async: true}),
  performance: belongsTo('performance', {async: true}),
  scores: hasMany('score', {async: true}),

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

  // lowReviews: computed.mapBy(
  //   'scores',
  //   'lowReview'
  // ),

  noVariance: computed(
    'scores.@each.lowReview',
    function() {
      return this.get('scores').isAny('lowReview');
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
