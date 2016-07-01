import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo, hasMany } from 'ember-data/relationships';
import {memberAction} from 'ember-api-actions';
const {computed} = Ember;

export default Model.extend({
  name: attr('string'),
  status: attr('performer-status'),
  picture: attr('string'),
  tenor: belongsTo('role', {async: true}),
  lead: belongsTo('role', {async: true}),
  baritone: belongsTo('role', {async: true}),
  bass: belongsTo('role', {async: true}),
  men: attr('number'),
  risers: attr('number'),
  is_evaluation: attr('boolean'),
  is_private: attr('boolean'),
  director: belongsTo('role', {async: true}),
  codirector: belongsTo('role', {async: true}),
  representing: belongsTo('organization', {async: true}),
  seed: attr('number'),
  prelim: attr('number'),
  rank: attr('number'),
  mus_points: attr('number'),
  prs_points: attr('number'),
  sng_points: attr('number'),
  total_points: attr('number'),
  mus_score: attr('number'),
  prs_score: attr('number'),
  sng_score: attr('number'),
  total_score: attr('number'),
  group: belongsTo('group', {async: true}),
  session: belongsTo('session', {async: true}),
  performances: hasMany('performance', {async: true}),
  contestants: hasMany('contestant', {async: true}),
  submissions: hasMany('submission', {async: true}),
  scratch: memberAction({path: 'scratch'}),
  penalizeEligibility: memberAction({path: 'penalize-eligibility'}),

  contestantSort: [
    'contest.is_qualifier:asc',
    'contest.award.level:desc',
    'contest.award.organization.name:asc',
    'contest.award.is_primary:desc',
    'contest.award.kind:asc',
    'contest.award.is_improved:asc',
    'contest.award.size:asc',
    'contest.award.scope:asc',
  ],
  sortedContestants: Ember.computed.sort(
    'contestants',
    'contestantSort'
  ),

  performanceSort: [
    'soa',
    'name',
  ],
  sortedPerformances: Ember.computed.sort(
    'performances',
    'performanceSort'
  ),

  tp: computed.mapBy(
    'performances',
    'totPoints'
  ),
  tc: computed.mapBy(
    'performances',
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
    'performances',
    'musPoints'
  ),
  mc: computed.mapBy(
    'performances',
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
    'performances',
    'prsPoints'
  ),
  pc: computed.mapBy(
    'performances',
    'spc'
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
    'performances',
    'sngPoints'
  ),
  sc: computed.mapBy(
    'performances',
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
  )
});
