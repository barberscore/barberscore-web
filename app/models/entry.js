import { not, alias } from '@ember/object/computed';
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
  chapters: DS.attr('string', {defaultValue: ''}),
  description: DS.attr('string', {defaultValue: ''}),
  notes: DS.attr('string', {defaultValue: ''}),
  imageId: DS.attr('string'),

  contests: DS.hasMany('contest', {async: true}),
  owners: DS.hasMany('user', {async: true}),
  session: DS.belongsTo('session', {async: true}),

  groupId: DS.attr('string'),
  groupStatus: DS.attr('group-status'),
  groupName: DS.attr('string', {defaultValue: ''}),
  groupNomen: DS.attr('string', {defaultValue: ''}),
  groupKind: DS.attr('group-kind'),
  groupGender: DS.attr('group-gender'),
  groupDivision: DS.attr('group-division'),
  groupBhsId: DS.attr('number'),
  groupCode: DS.attr('string', {defaultValue: ''}),
  groupDescription: DS.attr('string', {defaultValue: ''}),
  groupParticipants: DS.attr('string', {defaultValue: ''}),
  groupTreeSort: DS.attr('number'),
  groupInternational: DS.attr('string', {defaultValue: ''}),
  groupDistrict: DS.attr('string', {defaultValue: ''}),
  groupChapter: DS.attr('string', {defaultValue: ''}),
  groupIsSenior: DS.attr('boolean'),
  groupIsYouth: DS.attr('boolean'),
  groupIsDivided: DS.attr('boolean'),
  groupCharts: DS.attr(),

  statelogs: DS.hasMany('statelog', {async: true}),
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

  groupChartsCount: alias(
    'groupCharts.length'
  ),

  contestsCount: alias(
    'contests.length'
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

});
