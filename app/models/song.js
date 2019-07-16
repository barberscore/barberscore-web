import { not, sum, mapBy, filterBy } from '@ember/object/computed';
import { computed } from '@ember/object';
import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  status: DS.attr('song-status'),
  num: DS.attr('number'),
  asterisks: DS.attr(),
  dixons: DS.attr(),
  penalties: DS.attr(),
  stats: DS.attr(),

  appearance: DS.belongsTo('appearance', {async: true}),
  chartId: DS.attr('string'),
  chart: computed(
    'chartId',
    function() {
      if (this.chartId) {
        return this.store.findRecord('chart', this.chartId);
      } else {
        return null;
      }
    }
  ),

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
    10,
    30,
    40,
    50
  ],
});
