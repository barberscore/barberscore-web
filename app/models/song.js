import { not, sum, mapBy, filterBy } from '@ember/object/computed';
// import { computed } from '@ember/object';
import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default Model.extend({
  status: attr('song-status'),
  num: attr('number'),
  asterisks: attr(),
  dixons: attr(),
  penalties: attr(),
  stats: attr(),

  chartId: attr('string'),
  title: attr('string'),
  arrangers: attr('string'),

  appearance: belongsTo('appearance', {async: true, inverse: 'songs'}),
  scores: hasMany('score', {async: true, inverse: 'song'}),
  permissions: attr(),

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
  ],

  penaltyOptions: [
    30,
    32,
    34,
    36,
    38,
    39,
    40,
    44,
    48,
    50,
  ],
});
