import { alias, filterBy, equal, not, sort, mapBy, or } from '@ember/object/computed';
import Model from 'ember-data/model';
import DS from 'ember-data';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  status: DS.attr('contest-status'),

  session: DS.belongsTo('session', {async: true}),

  awardId: DS.belongsTo('award', {async: true}),
  awardName: DS.attr('string'),
  awardKind: DS.attr('award-kind'),
  awardGender: DS.attr('award-gender'),
  awardLevel: DS.attr('award-level'),
  awardSeason: DS.attr('award-season'),
  awardIsSingle: DS.attr('boolean'),
  awardDescription: DS.attr('string'),
  awardDistrict: DS.attr('string'),
  awardDivision: DS.attr('award-division'),
  awardAge: DS.attr('award-age'),
  awardIsNovice: DS.attr('boolean'),
  awardSize: DS.attr('award-size'),
  awardSizeRange: DS.attr(),
  awardScope: DS.attr('award-scope'),
  awardScopeRange: DS.attr(),

  contestants: DS.hasMany('contestant', {async: true}),
  permissions: DS.attr(),

  include: memberAction({path: 'include', type: 'post'}),
  exclude: memberAction({path: 'exclude', type: 'post'}),

  isDisabled: not(
    'permissions.write'
  ),

  sessionStatus: alias(
    'session.status',
  ),

  isSessionNew: equal(
    'sessionStatus',
    'New',
  ),
  isSessionBuilt: equal(
    'sessionStatus',
    'Built',
  ),

  isSessionNewBuilt: or(
    'isSessionNew',
    'isSessionBuilt',
  ),

  isCheckboxDisabled: not(
    'isSessionNewBuilt',
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

  isAwardQualifier: equal(
    'awardLevel',
    'Qualifier',
  ),
  notQualifier: not(
    'isAwardQualifier',
  ),
  mappedGroups: mapBy(
    'includedContestants',
    'group',
  ),

  contestantOptionsProperties: [
    'name',
  ],
  groupOptions: sort(
    'mappedGroups',
    'contestantOptionsProperties'
  ),

  groupKindSort: alias('award.group.kindSort'),
  awardQualifier: alias('award.isQualifier'),
  awardAgeSort: alias('award.ageSort'),
  awardTreeSort: alias('award.treeSort'),
});
