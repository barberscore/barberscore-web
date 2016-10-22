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
  actual_start: attr('date'),
  actual_finish: attr('date'),
  is_advancing: attr('boolean'),
  round: belongsTo('round', {async: true}),
  performer: belongsTo('performer', {async: true}),
  songs: hasMany('song', {async: true}),
  performancescore: belongsTo('performancescore', {async: true}),
  slot: belongsTo('slot', {async: true}),
  session: belongsTo('session', {async: true}),
  build: memberAction({path: 'build'}),
  scratch: memberAction({path: 'scratch'}),
  start: memberAction({path: 'start', type: 'post'}),
  verify: memberAction({path: 'verify', type: 'post'}),
  finish: memberAction({path: 'finish', type: 'post'}),
  complete: memberAction({path: 'complete', type: 'post'}),
  permissions: attr(),

  songSort: [
    'num',
  ],
  sortedSongs: Ember.computed.sort(
    'songs',
    'songSort'
  ),

  // totSongsPoints: computed.mapBy(
  //   'songs',
  //   'totPoints',
  // ),
  // totSongsCount: computed.mapBy(
  //   'songs',
  //   'totCount',
  // ),
  // totPoints: computed.sum(
  //   'totPoints',
  // ),
  // totCount: computed.sum(
  //   'totCount',
  // ),
  // totScore: Ember.computed(
  //   'totPoints',
  //   'totCount',
  //   function() {
  //       return (this.get('totPoints') / this.get('totCount')).toFixed(1);
  //     }
  //  ),

  tp: computed.mapBy(
    'songs',
    'totPoints'
  ),
  tc: computed.mapBy(
    'songs',
    'totCount'
  ),
  totPoints: computed.sum(
    'tp'
  ),
  stc: computed.sum(
    'tc'
  ),
  totScore: computed(
    'totPoints',
    'stc',
    function() {
      return (this.get('totPoints') / this.get('stc')).toFixed(1);
    }
  ),
  mp: computed.mapBy(
    'songs',
    'musPoints'
  ),
  mc: computed.mapBy(
    'songs',
    'musCount'
  ),
  musPoints: computed.sum(
    'mp'
  ),
  smc: computed.sum(
    'mc'
  ),
  musScore: computed(
    'musPoints',
    'smc',
    function() {
      return (this.get('musPoints') / this.get('smc')).toFixed(1);
    }
  ),
  pp: computed.mapBy(
    'songs',
    'prsPoints'
  ),
  pc: computed.mapBy(
    'songs',
    'prsCount'
  ),
  prsPoints: computed.sum(
    'pp'
  ),
  spc: computed.sum(
    'pc'
  ),
  prsScore: computed(
    'prsPoints',
    'spc',
    function() {
      return (this.get('prsPoints') / this.get('spc')).toFixed(1);
    }
  ),
  sp: computed.mapBy(
    'songs',
    'sngPoints'
  ),
  sc: computed.mapBy(
    'songs',
    'sngCount'
  ),
  sngPoints: computed.sum(
    'sp'
  ),
  ssc: computed.sum(
    'sc'
  ),
  sngScore: computed(
    'sngPoints',
    'ssc',
    function() {
      return (this.get('sngPoints') / this.get('ssc')).toFixed(1);
    }
  ),
});
