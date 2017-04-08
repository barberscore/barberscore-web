import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo, hasMany } from 'ember-data/relationships';
import {memberAction} from 'ember-api-actions';
const {computed} = Ember;

export default Model.extend({
  nomen: attr('string'),
  status: attr('entry-status'),
  picture: attr('string'),
  tenor: belongsTo('person', {async: true}),
  lead: belongsTo('person', {async: true}),
  baritone: belongsTo('person', {async: true}),
  bass: belongsTo('person', {async: true}),
  men: attr('number'),
  risers: attr('number'),
  is_evaluation: attr('boolean'),
  is_private: attr('boolean'),
  director: belongsTo('person', {async: true}),
  codirector: belongsTo('person', {async: true}),
  representing: belongsTo('entity', {async: true}),
  seed: attr('number'),
  prelim: attr('number'),
  entity: belongsTo('entity', {inverse: 'entries', async: true}),
  session: belongsTo('session', {async: true}),
  appearances: hasMany('appearance', {async: true}),
  contestants: hasMany('contestant', {async: true}),
  submissions: hasMany('submission', {async: true}),
  entryprivate: belongsTo('entryprivate', {async: true}),
  permissions: attr(),

  scratch: memberAction({path: 'scratch'}),
  penalizeEligibility: memberAction({path: 'penalize-eligibility'}),

  statusOptions: [
    'New',
    'Registered',
    'Accepted',
    'Declined',
    'Dropped',
    'Validated',
    'Scratched',
    'Disqualified',
    'Started',
    'Finished',
    'Published',
  ],


  tp: computed.mapBy(
    'appearances',
    'totPoints'
  ),
  tc: computed.mapBy(
    'appearances',
    'stc'
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
    'appearances',
    'musPoints'
  ),
  mc: computed.mapBy(
    'appearances',
    'smc'
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
    'appearances',
    'perPoints'
  ),
  pc: computed.mapBy(
    'appearances',
    'spc'
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
    'appearances',
    'sngPoints'
  ),
  sc: computed.mapBy(
    'appearances',
    'ssc'
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
  totRank: computed(
    'session.ranks.@each.{score,rank}',
    'totPoints',
    function() {
      return this.get('session.ranks').findBy('score', this.get('totPoints')).rank || null;
    }
  ),
  contestsArray: computed(
    'contestants.@each.contest', function() {
      return this.get('contestants');
  }),
  selectedContests: computed.mapBy(
    'contestsArray',
    'contest.id'
  ),
  numSubmissions: computed(
    'submissions.length', function() {
      return this.get('submissions.length');
  })
});
