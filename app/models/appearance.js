import {
  alias,
  gt,
  lt,
  mapBy,
  sort,
  not,
  equal,
  sum
} from '@ember/object/computed';
import Model from 'ember-data/model';
import DS from 'ember-data';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  status: DS.attr('appearance-status'),
  num: DS.attr('number'),
  draw: DS.attr('number'),
  actualStart: DS.attr('date'),
  actualFinish: DS.attr('date'),
  stats: DS.attr(),
  isMulti: DS.attr('boolean'),
  contesting: DS.attr({ defaultValue: function() { return []; } }),
  pos: DS.attr('number'),
  varianceReport: DS.attr('string'),
  round: DS.belongsTo('round', {async: true}),
  competitor: DS.belongsTo('competitor', {async: true}),
  grid: DS.belongsTo('grid', {async: true}),
  songs: DS.hasMany('song', {async: true}),
  permissions: DS.attr(),

  start: memberAction({path: 'start', type: 'post'}),
  finish: memberAction({path: 'finish', type: 'post'}),
  verify: memberAction({path: 'verify', type: 'post'}),
  mock: memberAction({path: 'mock', type: 'get'}),

  isDisabled: not(
    'permissions.write'
  ),

  isVerified: equal(
    'status',
    'Verified',
  ),

  statusOptions: [
    'New',
    'Validated',
    'Started',
    'Finished',
    'Confirmed',
    'Included',
    'Excluded',
    'Announced',
  ],


  isSingle: not(
    'isMulti'
  ),
  notMT: gt(
    'num',
    0
  ),
  roundNum: alias(
    'round.num'
  ),
  competitorStatus: alias(
    'competitor.status'
  ),
  competitorGroupName: alias(
    'competitor.groupName'
  ),
  competitorStatusSort: alias(
    'competitor.statusSort'
  ),
  isAdvancer: gt(
    'draw',
    0,
  ),
  isFinisher: lt(
    'draw',
    0,
  ),
  repertoriesFiltered: alias(
    'competitor.group.repertories'
  ),
  chartsMapped: mapBy(
    'repertoriesFiltered',
    'chart'
  ),
  chartOptionsProperties: [
    'title',
  ],
  chartOptions: sort(
    'chartsMapped',
    'chartOptionsProperties'
  ),
  groupName: alias(
    'competitor.group.name',
  ),
  practiceSongScores: mapBy(
    'songs',
    'sumPracticeScores',
  ),
  sumPractice: sum(
    'practiceSongScores',
  ),
  officialSongScores: mapBy(
    'songs',
    'sumOfficialScores',
  ),
  sumOfficial: sum(
    'officialSongScores',
  ),
  officialSingingSongScores: mapBy(
    'songs',
    'sumOfficialSingingScores',
  ),
  sumOfficialSinging: sum(
    'officialSingingSongScores',
  ),
  officialPerformanceSongScores: mapBy(
    'songs',
    'sumOfficialPerformanceScores',
  ),
  sumOfficialPerformance: sum(
    'officialPerformanceSongScores',
  ),
});
