import { and, alias, gt, lt, mapBy, sort, not, equal, notEmpty, sum, lte} from '@ember/object/computed';
// import { computed } from '@ember/object';
import Model, { attr, hasMany, belongsTo } from '@ember-data/model';
import { apiAction } from '@mainmatter/ember-api-actions';

export default Model.extend({
  status: attr('appearance-status'),
  num: attr('number'),
  draw: attr('number'),
  isPrivate: attr('boolean'),
  isSingle: attr('boolean'),
  participants: attr('string'),
  area: attr('string'),
  onstage: attr('date'),
  actualStart: attr('date'),
  actualFinish: attr('date'),
  pos: attr('number'),
  stats: attr(),
  base: attr('number'),
  diff: attr('number'),
  varianceReport: attr('string'),
  csaReport: attr('string'),

  groupId: attr('string'),
  entryId: attr('string'),
  name: attr('string'),
  kind: attr('group-kind'),
  gender: attr('group-gender'),
  district: attr('group-district'),
  division: attr('group-division'),
  bhsId: attr('number'),
  code: attr('string'),
  imageId: attr('string', {defaultValue: 'missing_image'}),
  charts: attr(),

  round: belongsTo('round', {async: true, inverse: 'appearances'}),
  songs: hasMany('song', {async: true, inverse: 'appearance'}),
  outcomes: hasMany('outcome', {async: true, inverse: 'appearances'}),
  owners: hasMany('user', {async: true, inverse: null}),
  permissions: attr(),

  start: async function(data) {
    return await apiAction(this, {path: 'start', method: 'POST', data: data})
  },
  finish: async function(data) {
    return await apiAction(this, {path: 'finish', method: 'POST', data: data})
  },
  verify: async function(data) {
    return await apiAction(this, {path: 'verify', method: 'POST', data: data})
  },
  complete: async function(data) {
    return await apiAction(this, {path: 'complete', method: 'POST', data: data})
  },
  advance: async function(data) {
    return await apiAction(this, {path: 'advance', method: 'POST', data: data})
  },
  scratch: async function(data) {
    return await apiAction(this, {path: 'scratch', method: 'POST', data: data})
  },
  disqualify: async function(data) {
    return await apiAction(this, {path: 'disqualify', method: 'POST', data: data})
  },
  mock: async function(data) {
    return await apiAction(this, {path: 'mock', method: 'GET', data: data})
  },
  variance: async function(data) {
    return await apiAction(this, { path: 'variance', method: 'GET', ajaxOptions: { arraybuffer: true } })
  },
  csa: async function(data) {
    return await apiAction(this, { path: 'csa', method: 'GET', ajaxOptions: { arraybuffer: true } })
  },

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

  isMT: lte(
    'num',
    0
  ),
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
  // entry: belongsTo('entry', {async: true}),
});
