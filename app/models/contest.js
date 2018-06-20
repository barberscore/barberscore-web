import { alias, filterBy, equal, not } from '@ember/object/computed';
import Model from 'ember-data/model';
import DS from 'ember-data';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  status: DS.attr('contest-status'),
  group: DS.belongsTo('group', {async: true}),
  session: DS.belongsTo('session', {async: true}),
  award: DS.belongsTo('award', {async: true}),
  contestants: DS.hasMany('contestant', {async: true}),
  permissions: DS.attr(),

  include: memberAction({path: 'include', type: 'post'}),
  exclude: memberAction({path: 'exclude', type: 'post'}),

  isDisabled: not(
    'permissions.write'
  ),

  statusOptions: [
    'New',
    'Included',
    'Excluded',
  ],

  kindOptions: [
    'New',
    'Championship',
    'Qualifier',
  ],

  includedContestants: filterBy(
    'contestants',
    'isIncluded'
  ),

  includedContestantsCount: alias(
    'includedContestants.length'
  ),

  isIncluded: equal(
    'status',
    'Included',
  ),

  groupKindSort: alias('award.group.kindSort'),
  awardQualifier: alias('award.isQualifier'),
  awardPrimary: alias('award.isPrimary'),
  awardAgeSort: alias('award.ageSort'),
  awardName: alias('award.name'),
  awardLevel: alias('award.level'),
});
