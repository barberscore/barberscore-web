import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  status: attr('song-status'),
  order: attr('song-order'),
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

  populatedScores: Ember.computed.filterBy(
    'scores',
    'notEmptyPoints'
  ),
  officialScores: Ember.computed.filterBy('populatedScores', 'kind', 'Official'),
  points: Ember.computed.mapBy('officialScores', 'points'),
  // pointsSort: ['points',],
  // pointsSorted: Ember.computed.sort('officialScores', 'pointsSort'),
  pointsSum: Ember.computed.sum('points'),
  pointsMean: Ember.computed('pointsSum', 'points', function() {
    return (this.get('pointsSum') / this.get('points').length);
  }),
  musScores: Ember.computed.filterBy('officialScores', 'category', 'Music'),
  musScoresPoints: Ember.computed.mapBy('musScores', 'points'),
  musPointsSum: Ember.computed.sum('musScoresPoints'),
  musPointsMean: Ember.computed('musPointsSum', 'musScores', function() {
    return (this.get('musPointsSum') / this.get('musScoresPoints').length).toFixed(1);
  }),
  prsScores: Ember.computed.filterBy('officialScores', 'category', 'Presentation'),
  prsScoresPoints: Ember.computed.mapBy('prsScores', 'points'),
  prsPointsSum: Ember.computed.sum('prsScoresPoints'),
  prsPointsMean: Ember.computed('prsPointsSum', 'prsScores', function() {
    return (this.get('prsPointsSum') / this.get('prsScoresPoints').length).toFixed(1);
  }),
  sngScores: Ember.computed.filterBy('officialScores', 'category', 'Singing'),
  sngScoresPoints: Ember.computed.mapBy('sngScores', 'points'),
  sngPointsSum: Ember.computed.sum('sngScoresPoints'),
  sngPointsMean: Ember.computed('sngPointsSum', 'sngScores', function() {
    return (this.get('sngPointsSum') / this.get('sngScoresPoints').length).toFixed(1);
  }),
});
