import Ember from 'ember';
import Model from 'ember-data/model';
import DS from 'ember-data';
import {memberAction} from 'ember-api-actions';
const {computed} = Ember;

export default Model.extend({
  nomen: DS.attr('string'),
  status: DS.attr('appearance-status'),
  num: DS.attr('number'),
  draw: DS.attr('number'),
  actual_start: DS.attr('date'),
  actual_finish: DS.attr('date'),
  is_advancing: DS.attr('boolean'),
  rank: DS.attr('number'),
  mus_points: DS.attr('number'),
  per_points: DS.attr('number'),
  sng_points: DS.attr('number'),
  tot_points: DS.attr('number'),
  mus_score: DS.attr('number'),
  per_score: DS.attr('number'),
  sng_score: DS.attr('number'),
  tot_score: DS.attr('number'),
  round: DS.belongsTo('round', {async: true}),
  entry: DS.belongsTo('entry', {async: true}),
  slot: DS.belongsTo('slot', {async: true}),
  songs: DS.hasMany('song', {async: true}),
  permissions: DS.attr(),

  scratch: memberAction({path: 'scratch'}),
  start: memberAction({path: 'start', type: 'post'}),
  verify: memberAction({path: 'verify', type: 'post'}),
  finish: memberAction({path: 'finish', type: 'post'}),
  confirm: memberAction({path: 'confirm', type: 'post'}),
  complete: memberAction({path: 'complete', type: 'post'}),

  statusOptions: [
    'New',
    'Validated',
    'Started',
    'Finished',
    'Confirmed',
    'Flagged',
    'Cleared',
    'Published',
  ],


  isAdvancer: Ember.computed.gt(
    'draw',
    0,
  ),
  isFinisher: Ember.computed.lt(
    'draw',
    0,
  ),
  slotNum: Ember.computed.alias(
    'slot.num'
  ),
  reportoriesFiltered: Ember.computed.alias(
    'entry.entity.repertories'
  ),
  chartsMapped: Ember.computed.mapBy(
    'reportoriesFiltered',
    'chart'
  ),
  chartOptionsProperties: [
    'title',
  ],
  chartOptions: Ember.computed.sort(
    'chartsMapped',
    'chartOptionsProperties'
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
    'perPoints'
  ),
  pc: computed.mapBy(
    'songs',
    'perCount'
  ),
  perPoints: computed.sum(
    'pp'
  ),
  spc: computed.sum(
    'pc'
  ),
  perScore: computed(
    'perPoints',
    'spc',
    function() {
      return (this.get('perPoints') / this.get('spc')).toFixed(1);
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
