import { and, alias, gt, lt, mapBy, sort, not, equal, notEmpty, sum} from '@ember/object/computed';
// import { computed } from '@ember/object';
import Model from 'ember-data/model';
import DS from 'ember-data';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  status: DS.attr('appearance-status'),
  num: DS.attr('number'),
  draw: DS.attr('number'),
  isPrivate: DS.attr('boolean'),
  isSingle: DS.attr('boolean'),
  participants: DS.attr('string'),
  area: DS.attr('string'),
  onstage: DS.attr('date'),
  actualStart: DS.attr('date'),
  actualFinish: DS.attr('date'),
  pos: DS.attr('number'),
  stats: DS.attr(),
  base: DS.attr('number'),
  varianceReport: DS.attr('string'),
  csaReport: DS.attr('string'),

  groupId: DS.attr('string'),
  name: DS.attr('string'),
  kind: DS.attr('string'),
  gender: DS.attr('string'),
  district: DS.attr('string'),
  division: DS.attr('string'),
  bhsId: DS.attr('string'),
  code: DS.attr('string'),

  round: DS.belongsTo('round', {async: true}),
  songs: DS.hasMany('song', {async: true}),
  outcomes: DS.hasMany('outcome', {async: true}),
  owners: DS.hasMany('user', {async: true}),
  permissions: DS.attr(),

  start: memberAction({path: 'start', type: 'post'}),
  finish: memberAction({path: 'finish', type: 'post'}),
  verify: memberAction({path: 'verify', type: 'post'}),
  complete: memberAction({path: 'complete', type: 'post'}),
  advance: memberAction({path: 'advance', type: 'post'}),
  scratch: memberAction({path: 'scratch', type: 'post'}),
  disqualify: memberAction({path: 'disqualify', type: 'post'}),

  mock: memberAction({path: 'mock', type: 'get'}),
  variance: memberAction({ path: 'variance', type: 'get', ajaxOptions: { arraybuffer: true } }),
  csa: memberAction({ path: 'csa', type: 'get', ajaxOptions: { arraybuffer: true } }),

  isDisabled: not(
    'permissions.write'
  ),

  isNumber: notEmpty(
    'draw',
  ),

  isGt: gt(
    'draw',
    0,
  ),

  isDrawn: and(
    'isNumber',
    'isGt',
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


  isMulti: not('isSingle'),
  notMT: gt(
    'num',
    0
  ),
  runTotSum: alias(
    'stats.tot_points',
  ),
  runSngSum: alias(
    'stats.sng_points',
  ),
  runPerSum: alias(
    'stats.per_points',
  ),
  runTotAvg: alias(
    'stats.tot_score',
  ),
  roundNum: alias(
    'round.num'
  ),
  conventionName: alias(
    'round.session.convention.nomen',
  ),
  sessionKind: alias(
    'round.session.kind',
  ),
  groupName: alias(
    'group.name'
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
    'group.repertories'
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
  // entry: DS.belongsTo('entry', {async: true}),
});
