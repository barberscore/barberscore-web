// import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  d_mus_points: DS.attr('number'),
  d_prs_points: DS.attr('number'),
  d_sng_points: DS.attr('number'),
  d_total_points: DS.attr('number'),
  d_mus_score: DS.attr('number'),
  d_prs_score: DS.attr('number'),
  d_sng_score: DS.attr('number'),
  d_total_score: DS.attr('number'),
  song: DS.belongsTo('song', {async: true}),

  // ascSortProperties: ['points:asc',],
  // ascSortedScores: Ember.computed.sort(
  //   'scores',
  //   'ascSortProperties'
  // ),
  // descSortProperties: ['points:desc',],
  // descSortedScores: Ember.computed.sort(
  //   'scores',
  //   'descSortProperties'
  // ),



  // officialScores: Ember.computed.filterBy('scores', 'kind', 'Official'),
  // points: Ember.computed.mapBy('officialScores', 'points'),
  // pointsSort: ['points',],
  // pointsSorted: Ember.computed.sort('officialScores', 'pointsSort'),
  // pointsSum: Ember.computed.sum('points'),
  // pointsMean: Ember.computed('pointsSum', 'points', function() {
  //   return (this.get('pointsSum') / this.get('points').length);
  // }),
  // musScores: Ember.computed.filterBy('officialScores', 'category', 'Music'),
  // musScoresPoints: Ember.computed.mapBy('musScores', 'points'),
  // musPointsSum: Ember.computed.sum('musScoresPoints'),
  // musPointsMean: Ember.computed('musPointsSum', 'musScores', function() {
  //   return (this.get('musPointsSum') / this.get('musScoresPoints').length).toFixed(1);
  // }),
  // prsScores: Ember.computed.filterBy('officialScores', 'category', 'Presentation'),
  // prsScoresPoints: Ember.computed.mapBy('prsScores', 'points'),
  // prsPointsSum: Ember.computed.sum('prsScoresPoints'),
  // prsPointsMean: Ember.computed('prsPointsSum', 'prsScores', function() {
  //   return (this.get('prsPointsSum') / this.get('prsScoresPoints').length).toFixed(1);
  // }),
  // sngScores: Ember.computed.filterBy('officialScores', 'category', 'Singing'),
  // sngScoresPoints: Ember.computed.mapBy('sngScores', 'points'),
  // sngPointsSum: Ember.computed.sum('sngScoresPoints'),
  // sngPointsMean: Ember.computed('sngPointsSum', 'sngScores', function() {
  //   return (this.get('sngPointsSum') / this.get('sngScoresPoints').length).toFixed(1);
  // }),
});
