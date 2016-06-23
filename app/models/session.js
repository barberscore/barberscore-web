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
    'performer.totPoints:desc',
    'group.chap_name:asc',
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

  judgeSort: [
    'category',
    'kind',
    'slot',
  ],
  sortedJudges: computed.sort(
    'judges',
    'judgeSort'
  ),

  officialJudges: computed.filterBy(
    'judges',
    'kind',
    'Official'
  ),
  sortedOfficialJudges: computed.sort(
    'officialJudges',
    'judgeSort'
  ),

  roundsSort: [
    'num:desc',
  ],
  sortedRounds: computed.sort(
    'rounds',
    'roundsSort'
  ),

  currentPerformancesSort: [
    'num',
  ],
  currentPerformances: computed.sort(
    'current.performances',
    'currentPerformancesSort'
  ),
  ranks: Ember.computed('performers', function() {
      let lastScore = null;
      let rank = 0;
      return this.get('performers').sortBy('totPoints').reverse().map(performer => {
         let score = performer.get('totPoints');
         if (score !== lastScore) {rank++;}
         lastScore = score;
         return {
             performer: performer,
             rank: rank
         };
      });
  })
});
