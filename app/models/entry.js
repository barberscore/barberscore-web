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
  group: computed(
    'groupId',
    function() {
      if (this.groupId) {
        return this.store.findRecord('group', this.groupId);
      } else {
        return null;
      }
    }
  ),
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
