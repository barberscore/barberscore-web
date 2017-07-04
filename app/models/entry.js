import Ember from 'ember';
import Model from 'ember-data/model';
import DS from 'ember-data';
import {memberAction} from 'ember-api-actions';
const {computed} = Ember;

export default Model.extend({
  nomen: DS.attr('string'),
  status: DS.attr('entry-status'),
  is_evaluation: DS.attr('boolean'),
  is_private: DS.attr('boolean'),
  draw: DS.attr('number'),
  seed: DS.attr('number'),
  prelim: DS.attr('number'),
  rank: DS.attr('number'),
  mus_points: DS.attr('number'),
  per_points: DS.attr('number'),
  sng_points: DS.attr('number'),
  tot_points: DS.attr('number'),
  mus_score: DS.attr('number'),
  per_score: DS.attr('number'),
  sng_score: DS.attr('number'),
  tot_score: DS.attr('number'),
  session: DS.belongsTo('session', {async: true}),
  entity: DS.belongsTo('entity', {inverse: 'entries', async: true}),
  representing: DS.belongsTo('entity', {async: true}),
  appearances: DS.hasMany('appearance', {async: true}),
  contestants: DS.hasMany('contestant', {async: true}),
  participants: DS.hasMany('participant', {async: true}),
  permissions: DS.attr(),

  invite: memberAction({path: 'invite', type: 'post'}),
  submit: memberAction({path: 'submit', type: 'post'}),
  accept: memberAction({path: 'accept', type: 'post'}),
  scratch: memberAction({path: 'scratch', type: 'post'}),
  complete: memberAction({path: 'complete', type: 'post'}),

  published: computed.equal(
    'status',
    'Published'
  ),

  notPublished: computed.not(
    'published'
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
    'Published',
  ],


  contestantCount: computed.alias('contestants.length'),
  participantCount: computed.alias('participants.length'),
  repertoryCount: computed.alias('entity.repertories.length'),
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
  // totRank: computed(
  //   'session.ranks.@each.{score,rank}',
  //   'totPoints',
  //   function() {
  //     return this.get('session.ranks').findBy('score', this.get('totPoints')).rank || null;
  //   }
  // ),
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
