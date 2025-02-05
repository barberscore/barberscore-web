import { not, sum, mapBy, filterBy } from '@ember/object/computed';
// import { computed } from '@ember/object';
import Model from '@ember-data/model';
import DS from '@ember-data';

export default Model.extend({
  status: DS.attr('song-status'),
  num: DS.attr('number'),
  asterisks: DS.attr(),
  dixons: DS.attr(),
  penalties: DS.attr(),
  stats: DS.attr(),

  chartId: DS.attr('string'),
  title: DS.attr('string'),
  arrangers: DS.attr('string'),

  appearance: DS.belongsTo('appearance', {async: true}),
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
