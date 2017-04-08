import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo, hasMany } from 'ember-data/relationships';
import {memberAction} from 'ember-api-actions';
const {computed} = Ember;

export default Model.extend({
  nomen: attr('string'),
  status: attr('appearance-status'),
  num: attr('number'),
  rank: attr('number'),
  actual_start: attr('date'),
  actual_finish: attr('date'),
  is_advancing: attr('boolean'),
  round: belongsTo('round', {async: true}),
  entry: belongsTo('entry', {async: true}),
  songs: hasMany('song', {async: true}),
  appearanceprivate: belongsTo('appearanceprivate', {async: true}),
  slot: belongsTo('slot', {async: true}),
  session: belongsTo('session', {async: true}),
  build: memberAction({path: 'build'}),
  scratch: memberAction({path: 'scratch'}),
  start: memberAction({path: 'start', type: 'post'}),
  verify: memberAction({path: 'verify', type: 'post'}),
  finish: memberAction({path: 'finish', type: 'post'}),
  complete: memberAction({path: 'complete', type: 'post'}),
  permissions: attr(),

  statusOptions: [
    'New',
    'Validated',
    'Started',
    'Finished',
    'Entered',
    'Flagged',
    'Cleared',
    'Published',
  ],


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
