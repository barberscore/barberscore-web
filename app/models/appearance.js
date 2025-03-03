import { and, alias, gt, lt, mapBy, sort, not, equal, notEmpty, sum} from '@ember/object/computed';
// import { computed } from '@ember/object';
import Model from '@ember-data/model';
import DS from 'ember-data';
import { apiAction } from '@mainmatter/ember-api-actions';

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
  diff: DS.attr('number'),
  varianceReport: DS.attr('string'),
  csaReport: DS.attr('string'),

  groupId: DS.attr('string'),
  entryId: DS.attr('string'),
  name: DS.attr('string'),
  kind: DS.attr('group-kind'),
  gender: DS.attr('group-gender'),
  district: DS.attr('group-district'),
  division: DS.attr('group-division'),
  bhsId: DS.attr('number'),
  code: DS.attr('string'),
  imageId: DS.attr('string', {defaultValue: 'missing_image'}),
  charts: DS.attr(),

  round: DS.belongsTo('round', {async: true, inverse: 'appearances'}),
  songs: DS.hasMany('song', {async: true, inverse: 'appearance'}),
  outcomes: DS.hasMany('outcome', {async: true, inverse: 'appearances'}),
  owners: DS.hasMany('user', {async: true, inverse: null}),
  permissions: DS.attr(),

  start: async function(data) {
    return await apiAction(this, {path: 'start', method: 'POST', data: data})
  },
  finish: async function(data) {
    return await apiAction(this, {path: 'finish', method: 'POST', data: data})
  },
  verify: async function(data) {
    return await apiAction(this, {path: 'verify', method: 'POST'})
  },
  complete: async function(data) {
    return await apiAction(this, {path: 'complete', method: 'POST'})
  },
  advance: async function(data) {
    return await apiAction(this, {path: 'advance', method: 'POST'})
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

  isMT: equal(
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
  // entry: DS.belongsTo('entry', {async: true}),
});
