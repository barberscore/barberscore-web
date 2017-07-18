import Ember from 'ember';
import Model from 'ember-data/model';
import DS from 'ember-data';
import {memberAction} from 'ember-api-actions';
const {computed} = Ember;

export default Model.extend({
  nomen: DS.attr('string'),
  status: DS.attr('entry-status'),
  isEvaluation: DS.attr('boolean'),
  isPrivate: DS.attr('boolean'),
  draw: DS.attr('number'),
  seed: DS.attr('number'),
  prelim: DS.attr('number'),
  rank: DS.attr('number'),
  musPoints: DS.attr('number'),
  perPoints: DS.attr('number'),
  sngPoints: DS.attr('number'),
  totPoints: DS.attr('number'),
  musScore: DS.attr('number'),
  perScore: DS.attr('number'),
  sngScore: DS.attr('number'),
  totScore: DS.attr('number'),
  session: DS.belongsTo('session', {async: true}),
  group: DS.belongsTo('group', {async: true}),
  organization: DS.belongsTo('organization', {inverse: 'entries', sync: true}),
  appearances: DS.hasMany('appearance', {async: true}),
  contestants: DS.hasMany('contestant', {async: true}),
  participants: DS.hasMany('participant', {async: true}),
  permissions: DS.attr(),

  invite: memberAction({path: 'invite', type: 'post'}),
  submit: memberAction({path: 'submit', type: 'post'}),
  accept: memberAction({path: 'accept', type: 'post'}),
  scratch: memberAction({path: 'scratch', type: 'post'}),
  complete: memberAction({path: 'complete', type: 'post'}),

  announced: computed.equal(
    'status',
    'Announced'
  ),

  notAnnounced: computed.not(
    'announced'
  ),

  expiringMembers: computed.filterBy(
    'participants',
    'isExpiring'
  ),

  expiringMembersCount: computed.alias(
    'expiringMembers.length'
  ),


  statusOptions: [
    'New',
    'Submitted',
    'Accepted',
    'Declined',
    'Dropped',
    'Validated',
    'Scratched',
    'Disqualified',
    'Started',
    'Finished',
    'Announced',
  ],


  contestantCount: computed.alias('contestants.length'),
  participantCount: computed.alias('participants.length'),
  repertoryCount: computed.alias('group.repertories.length'),
  tp: computed.mapBy(
    'appearances',
    'totPoints'
  ),
  tc: computed.mapBy(
    'appearances',
    'stc'
  ),
  totPointsCP: computed.sum(
    'tp'
  ),
  stc: computed.sum(
    'tc'
  ),
  totScoreCP: computed(
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
  musPointsCP: computed.sum(
    'mp'
  ),
  smc: computed.sum(
    'mc'
  ),
  musScoreCP: computed(
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
  perPointsCP: computed.sum(
    'pp'
  ),
  spc: computed.sum(
    'pc'
  ),
  perScoreCP: computed(
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
  sngPointsCP: computed.sum(
    'sp'
  ),
  ssc: computed.sum(
    'sc'
  ),
  sngScoreCP: computed(
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
  membersArray: computed(
    'participants.@each.member', function() {
      return this.get('participants');
  }),
  selectedContests: computed.mapBy(
    'contestsArray',
    'contest.id'
  ),
  selectedMembers: computed.mapBy(
    'membersArray',
    'member.id'
  ),
});
