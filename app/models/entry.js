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
  base: DS.attr('number'),
  participants: DS.attr('string', {defaultValue: ''}),
  pos: DS.attr('number'),
  representing: DS.attr('string', {defaultValue: ''}),
  description: DS.attr('string'),
  notes: DS.attr('string'),

  owners: DS.hasMany('user', {async: true}),
  session: DS.belongsTo('session', {async: true}),

  groupId: DS.attr('string'),
  groupStatus: DS.attr('group-status'),
  groupName: DS.attr('string'),
  groupNomen: DS.attr('string'),
  groupKind: DS.attr('group-kind'),
  groupGender: DS.attr('group-gender'),
  groupDivision: DS.attr('group-division'),
  groupBhsId: DS.attr('number'),
  groupCode: DS.attr('string'),
  groupImageId: DS.attr('string'),
  groupDescription: DS.attr('string'),
  groupParticipants: DS.attr('string'),
  groupTreeSort: DS.attr('number'),
  groupInternational: DS.attr('string'),
  groupDistrict: DS.attr('string'),
  groupChapter: DS.attr('string'),
  groupIsSenior: DS.attr('boolean'),
  groupIsYouth: DS.attr('boolean'),
  groupIsDivided: DS.attr('boolean'),
  groupCharts: DS.attr(),

  statelogs: DS.hasMany('statelog', {async: true}),
  contestants: DS.hasMany('contestant', {async: true}),
  permissions: DS.attr(),

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

  groupChartsCount: alias(
    'groupCharts.length'
  ),

  statusOptions: [
    'New',
    'Built',
    'Invited',
    'Withdrawn',
    'Submitted',
    'Approved',
  ],
  statusSort: computed(
    'status',
    'statusOptions',
    function() {
      return this.statusOptions.indexOf(this.status);
    }
  ),

  contestantCount: alias('contestants.length'),
  conventionStatus: alias('session.convention.status'),
  conventionStart: alias('session.convention.startDate'),
});
