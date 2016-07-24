import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo, hasMany } from 'ember-data/relationships';
import {memberAction} from 'ember-api-actions';
const {computed} = Ember;

export default Model.extend({
  name: attr('string'),
  status: attr('session-status'),
  kind: attr('session-kind'),
  start_date: attr('isodate'),
  finish_date: attr('isodate'),
  num_rounds: attr('number'),
  current: belongsTo('round', {async: true, inverse: 'current_session'}),
  primary: belongsTo('contest', {async: true, inverse: 'primary_contest'}),
  convention: belongsTo('convention', {async: true}),
  rounds: hasMany('round', {async: true}),
  performers: hasMany('performer', {async: true}),
  contests: hasMany('contest', {async: true}),
  assignments: hasMany('assignment', {async: true}),
  open: memberAction({path: 'open', type: 'post'}),
  close: memberAction({path: 'close', type: 'post'}),
  validate: memberAction({path: 'validate', type: 'post'}),
  start: memberAction({path: 'start', type: 'post'}),
  finish: memberAction({path: 'finish', type: 'post'}),
  draft: memberAction({path: 'draft', type: 'post'}),
  publish: memberAction({path: 'publish', type: 'post'}),
  cursor: belongsTo('performance', {async: true}),

  performerSortProperties: [
    'performerscore.total_points:desc',
  ],
  sortedPerformers: computed.sort(
    'performers',
    'performerSortProperties'
  ),

  publishedPerformers: computed.filterBy(
    'performers',
    'status',
    'Published'
  ),

  publishedSort: [
    'rank',
    'performer.group.name',
  ],
  sortedPublishedPerformers: computed.sort(
    'publishedPerformers',
    'publishedSort'
  ),

  primaryPerformers: computed.filterBy(
    'publishedPerformers',
    'rank'
  ),
  primarySort: [
    'rank',
    'sng_points:desc',
    'mus_points:desc',
    'prs_points:desc',
  ],
  sortedPrimaryPerformers: computed.sort(
    'primaryPerformers',
    'primarySort'
  ),

  secondaryPerformers: computed.filterBy(
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
  sortedSecondaryPerformers: computed.sort(
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
  sortedContests: computed.sort(
    'contests',
    'contestSort'
  ),

  championshipContests: computed.filterBy(
    'contests',
    'is_qualifier',
    false
  ),

  sortedChampionshipContests: computed.sort(
    'championshipContests',
    'contestSort'
  ),

  qualificationContests: computed.filterBy(
    'contests',
    'is_qualifier',
    true
  ),

  sortedQualificiationContests: computed.sort(
    'qualificationContests',
    'contestSort'
  ),

  assignmentSort: [
    'category',
    'kind',
    'slot',
  ],
  sortedAssignments: computed.sort(
    'assignments',
    'assignmentSort'
  ),

  officialAssignments: computed.filterBy(
    'assignments',
    'kind',
    'Official'
  ),
  sortedOfficialAssignments: computed.sort(
    'officialAssignments',
    'assignmentSort'
  ),

  roundsSort: [
    'num:desc',
  ],
  sortedRounds: computed.sort(
    'rounds',
    'roundsSort'
  ),

  slotsSort: [
    'onstage',
  ],
  sortedSlots: computed.sort(
    'slots',
    'slotsSort'
  ),

  currentPerformancesSort: [
    'num',
  ],
  currentPerformances: computed.sort(
    'current.performances',
    'currentPerformancesSort'
  ),
  allPerformancesSort: [
    'num',
  ],
  allPerformances: computed.sort(
    'sortedRounds.[].performances',
    'allPerformancesSort'
  ),
  ranks: Ember.computed('performers.@each.totPoints', function() {
    let lastScore = null;
    let lastRank = null;
    return this.get('performers').sortBy('totPoints').reverse().map((competitor, index) => {
       let score = competitor.get('totPoints');
       let rank = score === lastScore ? lastRank : index+1;
       lastScore = score;
       lastRank = rank;
       return {
           score: score,
           rank: rank
       };
    });
  })
});
