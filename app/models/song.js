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

  totMapped: Ember.computed.mapBy(
    'totScores',
    'points'
  ),
  totPoints: Ember.computed.sum(
    'totMapped'
  ),
  totScore: Ember.computed(
    'totPoints',
    'totMapped',
    function() {
        return (this.get('totPoints') / this.get('totMapped').length).toFixed(1);
      }
   ),

  musMapped: Ember.computed.mapBy(
    'musScores',
    'points'
  ),
  musPoints: Ember.computed.sum(
    'musMapped'
  ),
  musScore: Ember.computed(
    'musPoints',
    'musMapped',
    function() {
        return (this.get('musPoints') / this.get('musMapped').length).toFixed(1);
      }
   ),

  prsMapped: Ember.computed.mapBy(
    'prsScores',
    'points'
  ),
  prsPoints: Ember.computed.sum(
    'prsMapped'
  ),
  prsScore: Ember.computed(
    'prsPoints',
    'prsMapped',
    function() {
        return (this.get('prsPoints') / this.get('prsMapped').length).toFixed(1);
      }
   ),

  sngMapped: Ember.computed.mapBy(
    'sngScores',
    'points'
  ),
  sngPoints: Ember.computed.sum(
    'sngMapped'
  ),
  sngScore: Ember.computed(
    'sngPoints',
    'sngMapped',
    function() {
        return (this.get('sngPoints') / this.get('sngMapped').length).toFixed(1);
      }
   ),
});
