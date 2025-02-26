import { not } from '@ember/object/computed';
import { computed } from '@ember/object';
import Model from '@ember-data/model';
import DS from 'ember-data';
import { apiAction } from '@mainmatter/ember-api-actions';

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

  session: DS.belongsTo('session', {async: true, inverse: 'entries'}),
  contests: DS.hasMany('contest', {async: true, inverse: 'entries'}),
  repertories: DS.hasMany('repertory', {async: true, inverse: 'entry'}),
  owners: DS.hasMany('user', {async: true, inverse: null}),

  notificationList: DS.attr('string'),

  statelogs: DS.hasMany('statelog', {async: true, inverse: null}),
  permissions: DS.attr(),

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
