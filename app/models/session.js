import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import {memberAction} from 'ember-api-actions';


export default Model.extend({
  name: attr('string'),
  status: attr('session-status'),
  kind: attr('session-kind'),
  date: attr('date-range'),
  num_rounds: attr('number'),
  current: belongsTo('round', {async: true, inverse: 'current_session'}),
  primary: belongsTo('contest', {async: true, inverse: 'primary_contest'}),
  convention: belongsTo('convention', {async: true}),
  rounds: hasMany('round', {async: true}),
  performers: hasMany('performer', {async: true}),
  contests: hasMany('contest', {async: true}),
  judges: hasMany('judge', {async: true}),
  open: memberAction({path: 'open', type: 'post'}),
  close: memberAction({path: 'close', type: 'post'}),
  validate: memberAction({path: 'validate', type: 'post'}),
  start: memberAction({path: 'start', type: 'post'}),
  finish: memberAction({path: 'finish', type: 'post'}),
  draft: memberAction({path: 'draft', type: 'post'}),
  publish: memberAction({path: 'publish', type: 'post'}),
  cursor: attr('string'),

  performerSortProperties: ['group.chap_name:asc',],
  sortedPerformers: Ember.computed.sort(
    'performers',
    'performerSortProperties'
  ),
  contestSortProperties: [
    'is_qualifier:asc',
    'award.level:desc',
    'award.organization.name:asc',
    'award.is_primary:desc',
    'award.kind:asc',
    'award.is_improved:asc',
    'award.size:asc',
    'award.scope:asc',
  ],
  sortedContests: Ember.computed.sort(
    'contests',
    'contestSortProperties'
  ),
  judgeSortProperties: ['category', 'kind', 'slot',],
  sortedJudges: Ember.computed.sort(
    'judges',
    'judgeSortProperties'
  ),
  primaryContests: Ember.computed.filterBy(
    'contests',
    'award.is_primary'
  ),
  allOrganizations: Ember.computed(function() {
    return this.get('store').findAll('organization');
  }),
  orgsSort: ['lft'],
  organizationChoices: Ember.computed.sort(
    'allOrganizations',
    'orgsSort'
  ),
  currentRound: Ember.computed.filterBy(
    'rounds',
    'status',
    'Started'
  ),
  perfSort: ['slot', ],
  currentPerformances: Ember.computed.sort(
    'current.performances',
    'perfSort'
  ),
  roundsSort: ['num', ],
  sortedRounds: Ember.computed.sort(
    'rounds',
    'roundsSort'
  )
});
