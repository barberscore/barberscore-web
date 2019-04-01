import Model from 'ember-data/model';
import DS from 'ember-data';
import { alias, not, equal } from '@ember/object/computed';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  status: DS.attr('contestant-status'),
  stats: DS.attr(),
  entry: DS.belongsTo('entry', {async: true}),
  contest: DS.belongsTo('contest', {async: true}),
  permissions: DS.attr(),

  include: memberAction({path: 'include', type: 'post'}),
  exclude: memberAction({path: 'exclude', type: 'post'}),

  isDisabled: not(
    'permissions.write'
  ),

  statusOptions: [
    'Excluded',
    'New',
    'Included',
  ],

  isIncluded: equal(
    'status',
    'Included',
  ),

  group: alias('entry.group'),
  groupName: alias('entry.group.name'),
  contestGroupKindSort: alias('contest.award.group.kindSort'),
  contestAwardQualifier: alias('contest.award.isQualifier'),
  contestPrimary: alias('contest.isPrimary'),
  contestAwardAgeSort: alias('contest.award.ageSort'),
  contestAwardName: alias('contest.award.name'),
  awardSort: alias('contest.award.treeSort'),
});
