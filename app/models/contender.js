import Model from 'ember-data/model';
import DS from 'ember-data';
import { alias, not, equal } from '@ember/object/computed';

export default Model.extend({
  status: DS.attr('contender-status'),
  stats: DS.attr(),
  appearance: DS.belongsTo('appearance', {async: true}),
  outcome: DS.belongsTo('outcome', {async: true}),
  permissions: DS.attr(),


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

  group: alias('appearance.group'),
  groupName: alias('appearance.group.name'),
  contestGroupKindSort: alias('outcome.award.group.kindSort'),
  contestAwardQualifier: alias('outcome.award.isQualifier'),
  contestAwardAgeSort: alias('outcome.award.ageSort'),
  contestAwardName: alias('outcome.award.name'),
  awardSort: alias('outcome.award.treeSort'),

  runSum: alias(
    'appearance.runTotal.sum',
  ),
  runSng: alias(
    'appearance.runTotal.sng',
  ),
  runPEr: alias(
    'appearance.runTotal.per',
  ),
});
