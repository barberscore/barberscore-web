import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo, hasMany } from 'ember-data/relationships';
import {memberAction} from 'ember-api-actions';
const {computed} = Ember;

export default Model.extend({
  name: attr('string'),
  status: attr('performance-status'),
  num: attr('number'),
  rank: attr('number'),
  scheduled: attr('date-range'),
  actual: attr('date-range'),
  actual_start: attr('date'),
  actual_finish: attr('date'),
  is_advancing: attr('boolean'),
  mus_points: attr('number'),
  prs_points: attr('number'),
  sng_points: attr('number'),
  total_points: attr('number'),
  mus_score: attr('number'),
  prs_score: attr('number'),
  sng_score: attr('number'),
  total_score: attr('number'),
  round: belongsTo('round', {async: true}),
  performer: belongsTo('performer', {async: true}),
  songs: hasMany('song', {async: true}),
  slot: belongsTo('slot', {async: true}),
  session: belongsTo('session', {async: true}),
  build: memberAction({path: 'build'}),
  move_top: memberAction({path: 'move_top'}),
  move_up: memberAction({path: 'move_up'}),
  move_down: memberAction({path: 'move_down'}),
  move_bottom: memberAction({path: 'move_bottom'}),
  scratch: memberAction({path: 'scratch'}),
  start: memberAction({path: 'start', type: 'post'}),
  finish: memberAction({path: 'finish', type: 'post'}),
  complete: memberAction({path: 'complete', type: 'post'}),


  points: computed.mapBy('songs', 'pointsSum'),
  means: computed.mapBy('songs', 'pointsMean'),
  meansSum: computed.sum('means'),
  pointsSum: computed.sum('points'),
  pointsMean: computed('meansSum', 'means', function() {
    return (this.get('meansSum') / this.get('means').length);
  }),
  musScoresPoints: computed.mapBy('songs', 'musPointsSum'),
  musPointsSum: computed.sum('musScoresPoints'),
  // musPointsMean: computed('musPointsSum', 'musScores', function() {
  //   return (this.get('musPointsSum') / this.get('musScoresPoints').length).toFixed(1);
  // }),
  prsScoresPoints: computed.mapBy('songs', 'prsPointsSum'),
  prsPointsSum: computed.sum('prsScoresPoints'),
  // prsPointsMean: computed('prsPointsSum', 'prsScores', function() {
  //   return (this.get('prsPointsSum') / this.get('prsScoresPoints').length).toFixed(1);
  // }),
  sngScoresPoints: computed.mapBy('songs', 'sngPointsSum'),
  sngPointsSum: computed.sum('sngScoresPoints'),
  // sngPointsMean: computed('sngPointsSum', 'sngScores', function() {
  //   return (this.get('sngPointsSum') / this.get('sngScoresPoints').length).toFixed(1);
  // }),
});
