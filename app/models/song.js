import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  status: DS.attr('song-status'),
  order: DS.attr('song-order'),
  arranger: DS.attr('string'),
  mus_points: DS.attr('number'),
  prs_points: DS.attr('number'),
  sng_points: DS.attr('number'),
  total_points: DS.attr('number'),
  mus_score: DS.attr('number'),
  prs_score: DS.attr('number'),
  sng_score: DS.attr('number'),
  total_score: DS.attr('number'),
  chart: DS.belongsTo('chart', {async: true}),
  performance: DS.belongsTo('performance', {async: true}),
  scores: DS.hasMany('score', {async: true}),
  points: Ember.computed.mapBy('scores', 'points'),
  pointsSort: ['points',],
  pointsSorted: Ember.computed.sort('scores', 'pointsSort'),
  pointsSum: Ember.computed.sum('points'),
  pointsMean: Ember.computed('pointsSum', 'points', function() {
    return (this.get('pointsSum') / this.get('points').length);
  }),
  musScores: Ember.computed.filterBy('scores', 'category', 'Music'),
  musScoresPoints: Ember.computed.mapBy('musScores', 'points'),
  musPointsSum: Ember.computed.sum('musScoresPoints'),
  musPointsMean: Ember.computed('musPointsSum', 'musScores', function() {
    return (this.get('musPointsSum') / this.get('musScoresPoints').length).toFixed(1);
  }),
  prsScores: Ember.computed.filterBy('scores', 'category', 'Presentation'),
  prsScoresPoints: Ember.computed.mapBy('prsScores', 'points'),
  prsPointsSum: Ember.computed.sum('prsScoresPoints'),
  prsPointsMean: Ember.computed('prsPointsSum', 'prsScores', function() {
    return (this.get('prsPointsSum') / this.get('prsScoresPoints').length).toFixed(1);
  }),
  sngScores: Ember.computed.filterBy('scores', 'category', 'Singing'),
  sngScoresPoints: Ember.computed.mapBy('sngScores', 'points'),
  sngPointsSum: Ember.computed.sum('sngScoresPoints'),
  sngPointsMean: Ember.computed('sngPointsSum', 'sngScores', function() {
    return (this.get('sngPointsSum') / this.get('sngScoresPoints').length).toFixed(1);
  }),
});
