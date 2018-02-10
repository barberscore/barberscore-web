import Model from 'ember-data/model';
import DS from 'ember-data';
import { alias, equal } from '@ember/object/computed';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  nomen: DS.attr('string'),
  status: DS.attr('contestant-status'),
  rank: DS.attr('number'),
  musPoints: DS.attr('number'),
  perPoints: DS.attr('number'),
  sngPoints: DS.attr('number'),
  totPoints: DS.attr('number'),
  musScore: DS.attr('number'),
  perScore: DS.attr('number'),
  sngScore: DS.attr('number'),
  totScore: DS.attr('number'),
  entry: DS.belongsTo('entry', {async: true}),
  contest: DS.belongsTo('contest', {async: true}),
  permissions: DS.attr(),
  include: memberAction({path: 'include', type: 'post'}),
  exclude: memberAction({path: 'exclude', type: 'post'}),

  statusOptions: [
    'Excluded',
    'New',
    'Included',
  ],
  entryTotPoints: alias('entry.totPoints'),

  isIncluded: equal(
    'status',
    'Included',
  ),

  contestOrganizationKindSort: alias('contest.award.organization.kindSort'),
  contestAwardQualifier: alias('contest.award.isQualifier'),
  contestAwardPrimary: alias('contest.award.isPrimary'),
  contestAwardAgeSort: alias('contest.award.ageSort'),
  contestAwardName: alias('contest.award.name'),

});
