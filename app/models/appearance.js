import {
  and,
  alias,
  gt,
  lt,
  mapBy,
  sort,
  not,
  equal,
  notEmpty,
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
  runTotal: DS.attr(),
  contesting: DS.attr({ defaultValue: function() { return []; } }),
  isPrivate: DS.attr('boolean'),
  isSingle: DS.attr('boolean'),
  pos: DS.attr('number'),
  participants: DS.attr('string'),
  group: DS.belongsTo('group', {async: true}),
  round: DS.belongsTo('round', {async: true}),
  grid: DS.belongsTo('grid', {async: true}),
  songs: DS.hasMany('song', {async: true}),
  contenders: DS.hasMany('contender', {async: true}),
  permissions: DS.attr(),

  start: memberAction({path: 'start', type: 'post'}),
  finish: memberAction({path: 'finish', type: 'post'}),
  verify: memberAction({path: 'verify', type: 'post'}),
  scratch: memberAction({path: 'scratch', type: 'post'}),

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
  runTot: alias(
    'runTotal.sum',
  ),
  runSng: alias(
    'runTotal.sum',
  ),
  runPer: alias(
    'runTotal.sum',
  ),
  roundNum: alias(
    'round.num'
  ),
  conventionName: alias(
    'round.session.convention.name',
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
});
