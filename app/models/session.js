import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo, hasMany } from 'ember-data/relationships';
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
  cursor: belongsTo('performance', {async: true}),

  performerSortProperties: [
    'group.chap_name:asc',
  ],
  sortedPerformers: Ember.computed.sort(
    'performers',
    'performerSortProperties'
  ),

  publishedPerformers: Ember.computed.filterBy(
    'performers',
    'status',
    'Published'
  ),

  publishedSort: [
    'rank',
    'performer.group.name',
  ],
  sortedPublishedPerformers: Ember.computed.sort(
    'publishedPerformers',
    'publishedSort'
  ),

  primaryPerformers: Ember.computed.filterBy(
    'publishedPerformers',
    'rank'
  ),
  primarySort: [
    'rank',
    'sng_points:desc',
    'mus_points:desc',
    'prs_points:desc',
  ],
  sortedPrimaryPerformers: Ember.computed.sort(
    'primaryPerformers',
    'primarySort'
  ),

  secondaryPerformers: Ember.computed.filterBy(
    'publishedPerformers',
    'rank',
    null
  ),
  secondarySort: [
    'total_points:desc',
    'sng_points:desc',
    'mus_points:desc',
    'prs_points:desc',
  ],
  sortedSecondaryPerformers: Ember.computed.sort(
    'secondaryPerformers',
    'secondarySort'
  ),

  contestSort: [
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
    'contestSort'
  ),

  championshipContests: Ember.computed.filterBy(
    'contests',
    'is_qualifier',
    false
  ),

  sortedChampionshipContests: Ember.computed.sort(
    'championshipContests',
    'contestSort'
  ),

  qualificationContests: Ember.computed.filterBy(
    'contests',
    'is_qualifier',
    true
  ),

  sortedQualificiationContests: Ember.computed.sort(
    'qualificationContests',
    'contestSort'
  ),

  judgeSort: [
    'category',
    'kind',
    'slot',
  ],
  sortedJudges: Ember.computed.sort(
    'judges',
    'judgeSort'
  ),

  officialJudges: Ember.computed.filterBy(
    'judges',
    'kind',
    'Official'
  ),
  sortedOfficialJudges: Ember.computed.sort(
    'officialJudges',
    'judgeSort'
  ),

  roundsSort: [
    'num:desc',
  ],
  sortedRounds: Ember.computed.sort(
    'rounds',
    'roundsSort'
  ),

  currentPerformancesSort: [
    'num',
  ],
  currentPerformances: Ember.computed.sort(
    'current.performances',
    'currentPerformancesSort'
  ),
});
