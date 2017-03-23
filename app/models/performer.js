import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo, hasMany } from 'ember-data/relationships';
import {memberAction} from 'ember-api-actions';
const {computed} = Ember;

export default Model.extend({
  nomen: attr('string'),
  status: attr('performer-status'),
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
  // representing: belongsTo('organization', {async: true}),
  seed: attr('number'),
  prelim: attr('number'),
  quartet: belongsTo('quartet', {async: true}),
  session: belongsTo('session', {async: true}),
  performances: hasMany('performance', {async: true}),
  contestants: hasMany('contestant', {async: true}),
  submissions: hasMany('submission', {async: true}),
  performerscore: belongsTo('performerscore', {async: true}),
  scratch: memberAction({path: 'scratch'}),
  permissions: attr(),

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
