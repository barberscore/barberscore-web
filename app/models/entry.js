import { not } from '@ember/object/computed';
import { computed } from '@ember/object';
import Model from 'ember-data/model';
import DS from 'ember-data';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  status: DS.attr('entry-status'),
  isEvaluation: DS.attr('boolean', {defaultValue: true}),
  isPrivate: DS.attr('boolean', {defaultValue: false}),
  isMt: DS.attr('boolean', {defaultValue: false}),
  draw: DS.attr('number'),
  seed: DS.attr('number'),
  prelim: DS.attr('number'),
  base: DS.attr('number'),
  participants: DS.attr('string', {defaultValue: ''}),
  pos: DS.attr('number'),
  area: DS.attr('string', {defaultValue: ''}),
  chapters: DS.attr('string', {defaultValue: ''}),
  description: DS.attr('string', {defaultValue: ''}),
  notes: DS.attr('string', {defaultValue: ''}),
  imageId: DS.attr('string', {defaultValue: 'missing_image'}),

  groupId: DS.attr('string'),
  name: DS.attr('string', {defaultValue: ''}),
  kind: DS.attr('group-kind'),
  gender: DS.attr('group-gender'),
  district: DS.attr('group-district'),
  division: DS.attr('group-division'),
  bhsId: DS.attr('number'),
  code: DS.attr('string', {defaultValue: ''}),
  isSenior: DS.attr('boolean', {defaultValue: false}),
  isYouth: DS.attr('boolean', {defaultValue: false}),

  session: DS.belongsTo('session', {async: true}),
  contests: DS.hasMany('contest', {async: true}),
  repertories: DS.hasMany('repertory', {async: true}),
  owners: DS.hasMany('user', {async: true}),

  notificationList: DS.attr('string'),

  statelogs: DS.hasMany('statelog', {async: true}),
  permissions: DS.attr(),

  build: memberAction({path: 'build', type: 'post'}),
  invite: memberAction({path: 'invite', type: 'post'}),
  withdraw: memberAction({path: 'withdraw', type: 'post'}),
  submit: memberAction({path: 'submit', type: 'post'}),
  approve: memberAction({path: 'approve', type: 'post'}),
  update_charts: memberAction({path: 'update_charts', type: 'post'}),
  contest: memberAction({path: 'contest', type: 'post'}),


  isDisabled: not(
    'permissions.write'
  ),

  notMt: not(
    'isMt'
  ),

  // groupChartsCount: alias(
  //   'groupCharts.length'
  // ),

  // contestsCount: alias(
  //   'contests.length'
  // ),

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
