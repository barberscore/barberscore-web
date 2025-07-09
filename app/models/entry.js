import { not } from '@ember/object/computed';
import { computed } from '@ember/object';
import Model, { attr, hasMany, belongsTo } from '@ember-data/model';
import { apiAction } from '@mainmatter/ember-api-actions';

export default Model.extend({
  status: attr('entry-status'),
  isEvaluation: attr('boolean', {defaultValue: true}),
  isPrivate: attr('boolean', {defaultValue: false}),
  isMt: attr('boolean', {defaultValue: false}),
  draw: attr('number'),
  seed: attr('number'),
  prelim: attr('number'),
  base: attr('number'),
  participants: attr('string', {defaultValue: ''}),
  pos: attr('number'),
  area: attr('string', {defaultValue: ''}),
  chapters: attr('string', {defaultValue: ''}),
  description: attr('string', {defaultValue: ''}),
  notes: attr('string', {defaultValue: ''}),
  imageId: attr('string', {defaultValue: 'missing_image'}),

  groupId: attr('string'),
  name: attr('string', {defaultValue: ''}),
  kind: attr('group-kind'),
  gender: attr('group-gender'),
  district: attr('group-district'),
  division: attr('group-division'),
  bhsId: attr('number'),
  code: attr('string', {defaultValue: ''}),
  isSenior: attr('boolean', {defaultValue: false}),
  isYouth: attr('boolean', {defaultValue: false}),

  session: belongsTo('session', {async: true, inverse: 'entries'}),
  contests: hasMany('contest', {async: true, inverse: 'entries'}),
  repertories: hasMany('repertory', {async: true, inverse: 'entry'}),
  owners: hasMany('user', {async: true, inverse: null}),

  notificationList: attr('string'),

  statelogs: hasMany('statelog', {async: true, inverse: null}),
  permissions: attr(),

  build: async function(data) {
    return await apiAction(this, {path: 'build', method: 'POST', data: data})
  },
  create_manual_entry: async function (data) {
    return await apiAction(this, {path: 'create_manual_entry', method: 'POST', data: data})
  },
  invite: async function (data) {
    return await apiAction(this, {path: 'invite', method: 'POST', data: data})
  },
  withdraw: async function (data) {
    return await apiAction(this, {path: 'withdraw', method: 'POST', data: data})
  },
  submit: async function(data) {
    return await apiAction(this, {path: 'submit', method: 'POST', data: data})
  },
  approve: async function(data) {
    return await apiAction(this, {path: 'approve', method: 'POST', data: data})
  },
  update_charts: async function(data) {
    return await apiAction(this, {path: 'update_charts', method: 'POST', data: data})
  },
  contest: async function(data) {
    return await apiAction(this, {path: 'contest', method: 'POST', data: data})
  },


  isDisabled: computed(
    'permissions.write','session.(roundsPublished,status}',
    function() {
      if (this.get('session.status') != 'Packaged') {
        return true;
      }
      if (this.get('session.roundsPublished')) {
        return true;
      }
      if (this.get('permissions.write')) {
        return false;
      } else {
        return true;
      }
    }
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
