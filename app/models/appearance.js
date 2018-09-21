import { alias, gt, lt, mapBy, sort, not, equal, sum } from '@ember/object/computed';
import Model from 'ember-data/model';
import DS from 'ember-data';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  status: DS.attr('appearance-status'),
  num: DS.attr('number'),
  draw: DS.attr('number'),
  actualStart: DS.attr('date'),
  actualFinish: DS.attr('date'),
  musPoints: DS.attr('number'),
  perPoints: DS.attr('number'),
  sngPoints: DS.attr('number'),
  totPoints: DS.attr('number'),
  musScore: DS.attr('number'),
  perScore: DS.attr('number'),
  sngScore: DS.attr('number'),
  totScore: DS.attr('number'),
  musRank: DS.attr('number'),
  perRank: DS.attr('number'),
  sngRank: DS.attr('number'),
  totRank: DS.attr('number'),
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


  isRanked: alias(
    'competitor.isRanked'
  ),
  isMulti: alias(
    'competitor.isMulti'
  ),
  roundNum: alias(
    'round.num'
  ),
  competitorTotPoints: alias(
    'competitor.totPoints'
  ),
  competitorSngPoints: alias(
    'competitor.sngPoints'
  ),
  competitorPerPoints: alias(
    'competitor.perPoints'
  ),
  competitorTotScore: alias(
    'competitor.totScore'
  ),
  competitorTotRank: alias(
    'competitor.totRank'
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
  officialSongScores: mapBy(
    'songs',
    'sumOfficialScores',
  ),
  sumPractice: sum(
    'practiceSongScores',
  ),
  sumOfficial: sum(
    'officialSongScores',
  ),
});
