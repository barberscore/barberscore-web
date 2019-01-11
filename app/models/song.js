import { not, sum, mapBy, filterBy } from '@ember/object/computed';
import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  // Fields
  status: DS.attr('song-status'),
  legacyChart: DS.attr('string'),
  num: DS.attr('number'),
  penalties: DS.attr(),
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
  appearance: DS.belongsTo('appearance', {async: true}),
  chart: DS.belongsTo('chart', {async: true}),
  scores: DS.hasMany('score', {async: true}),
  permissions: DS.attr(),

  isDisabled: not(
    'permissions.write'
  ),

  practiceScores: filterBy(
    'scores',
    'isPractice',
  ),
  practiceScoresPoints: mapBy(
    'practiceScores',
    'intPoints',
  ),
  sumPracticeScores: sum(
    'practiceScoresPoints',
  ),

  officialScores: filterBy(
    'scores',
    'isOfficial',
  ),
  officialScoresPoints: mapBy(
    'officialScores',
    'intPoints',
  ),
  sumOfficialScores: sum(
    'officialScoresPoints',
  ),

  statusOptions: [
    'New',
    'Validated',
    'Finished',
    'Confirmed',
    'Final',
    'Announced',
  ],
  penaltyOptions: [
    10,
    20,
    30,
    40,
    50
  ],
});
