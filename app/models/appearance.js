import { alias, gt, lt, mapBy, sort, sum } from '@ember/object/computed';
import { computed } from '@ember/object';
import Model from 'ember-data/model';
import DS from 'ember-data';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  nomen: DS.attr('string'),
  status: DS.attr('appearance-status'),
  num: DS.attr('number'),
  draw: DS.attr('number'),
  actualStart: DS.attr('date'),
  actualFinish: DS.attr('date'),
  isAdvancing: DS.attr('boolean'),
  rank: DS.attr('number'),
  musPoints: DS.attr('number'),
  perPoints: DS.attr('number'),
  sngPoints: DS.attr('number'),
  totPoints: DS.attr('number'),
  musScore: DS.attr('number'),
  perScore: DS.attr('number'),
  sngScore: DS.attr('number'),
  totScore: DS.attr('number'),
  varPdf: DS.attr('string'),

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
  printVar: memberAction({path: 'print_var', type: 'post'}),

  statusOptions: [
    'New',
    'Validated',
    'Started',
    'Finished',
    'Confirmed',
    'Flagged',
    'Cleared',
    'Announced',
  ],


  entryTotPoints: alias(
    'entry.totPoints'
  ),
  entryRank: alias(
    'entry.rank'
  ),
  isAdvancer: gt(
    'draw',
    0,
  ),
  isFinisher: lt(
    'draw',
    0,
  ),
  slotNum: alias(
    'slot.num'
  ),
  repertoriesFiltered: alias(
    'entry.group.repertories'
  ),
  chartsMapped: mapBy(
    'repertoriesFiltered',
    'chart'
  ),
  chartOptionsProperties: [
    'title',
  ],
  chartOptions: sort(
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

  tp: mapBy(
    'songs',
    'totPoints'
  ),
  tc: mapBy(
    'songs',
    'totCount'
  ),
  totPointsCP: sum(
    'tp'
  ),
  stc: sum(
    'tc'
  ),
  totScoreCP: computed(
    'totPoints',
    'stc',
    function() {
      return (this.get('totPoints') / this.get('stc')).toFixed(1);
    }
  ),
  mp: mapBy(
    'songs',
    'musPoints'
  ),
  mc: mapBy(
    'songs',
    'musCount'
  ),
  musPointsCP: sum(
    'mp'
  ),
  smc: sum(
    'mc'
  ),
  musScoreCP: computed(
    'musPoints',
    'smc',
    function() {
      return (this.get('musPoints') / this.get('smc')).toFixed(1);
    }
  ),
  pp: mapBy(
    'songs',
    'perPoints'
  ),
  pc: mapBy(
    'songs',
    'perCount'
  ),
  perPointsCP: sum(
    'pp'
  ),
  spc: sum(
    'pc'
  ),
  perScoreCP: computed(
    'perPoints',
    'spc',
    function() {
      return (this.get('perPoints') / this.get('spc')).toFixed(1);
    }
  ),
  sp: mapBy(
    'songs',
    'sngPoints'
  ),
  sc: mapBy(
    'songs',
    'sngCount'
  ),
  sngPointsCP: sum(
    'sp'
  ),
  ssc: sum(
    'sc'
  ),
  sngScoreCP: computed(
    'sngPoints',
    'ssc',
    function() {
      return (this.get('sngPoints') / this.get('ssc')).toFixed(1);
    }
  ),
});
