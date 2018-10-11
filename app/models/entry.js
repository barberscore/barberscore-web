import { not, filterBy, alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import Model from 'ember-data/model';
import DS from 'ember-data';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  status: DS.attr('entry-status'),
  isEvaluation: DS.attr('boolean'),
  isPrivate: DS.attr('boolean'),
  isMt: DS.attr('boolean'),
  draw: DS.attr('number'),
  seed: DS.attr('number'),
  prelim: DS.attr('number'),
  participants: DS.attr('string', {defaultValue: ''}),
  pos: DS.attr('number'),
  representing: DS.attr('string', {defaultValue: ''}),
  description: DS.attr('string'),
  musPoints: DS.attr('number'),
  perPoints: DS.attr('number'),
  sngPoints: DS.attr('number'),
  totPoints: DS.attr('number'),
  musScore: DS.attr('number'),
  perScore: DS.attr('number'),
  sngScore: DS.attr('number'),
  totScore: DS.attr('number'),
  musRank: DS.attr('number'),
  perRank: DS.attr('number'),
  sngRank: DS.attr('number'),
  totRank: DS.attr('number'),
  session: DS.belongsTo('session', {async: true}),
  group: DS.belongsTo('group', {async: true}),
  competitor: DS.belongsTo('competitor', {async: true}),
  contestants: DS.hasMany('contestant', {async: true}),
  permissions: DS.attr(),
  statelogs: DS.hasMany('statelog', {async: true}),

  build: memberAction({path: 'build', type: 'post'}),
  invite: memberAction({path: 'invite', type: 'post'}),
  withdraw: memberAction({path: 'withdraw', type: 'post'}),
  submit: memberAction({path: 'submit', type: 'post'}),
  approve: memberAction({path: 'approve', type: 'post'}),

  isDisabled: not(
    'permissions.write'
  ),

  notMt: not(
    'isMt'
  ),

  includedContestants: filterBy(
    'contestants',
    'isIncluded'
  ),

  includedContestantsCount: alias(
    'includedContestants.length'
  ),

  statusOptions: [
    'New',
    'Invited',
    'Withdrawn',
    'Submitted',
    'Approved',
    'Scratched',
    'Disqualified',
  ],
  statusSort: computed(
    'status',
    'statusOptions',
    function() {
      return this.statusOptions.indexOf(this.status);
    }
  ),
  parentName: alias('group.parent.name'),
  code: alias('group.parent.code'),
  chapterCode: computed(
    'parentName',
    'code',
    function() {
      return `${this.parentName} (${this.code})`;
    }
  ),
  allMembers: alias('group.members'),
  contestantCount: alias('contestants.length'),
  activeMembersCount: alias('group.activeMembers.length'),
  repertoryCount: alias('group.repertories.length'),
  conventionStatus: alias('session.convention.status'),
  conventionStart: alias('session.convention.startDate'),
  groupName: alias('group.name')
});
