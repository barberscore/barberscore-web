import Model from 'ember-data/model';
import DS from 'ember-data';
import { alias, not, equal } from '@ember/object/computed';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  status: DS.attr('contestant-status'),
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
  competitorPoints: alias('competitor.totPoints'),

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
  competitorTotPoints: alias('entry.competitor.totPoints'),
});
