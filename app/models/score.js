import { alias, not, equal, and } from '@ember/object/computed';
import { computed } from '@ember/object';
import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  status: DS.attr('score-status'),
  points: DS.attr('number'),
  song: DS.belongsTo('song', {async: true}),
  panelist: DS.belongsTo('panelist', {async: true}),
  permissions: DS.attr(),

  kind: alias('panelist.kind'),
  num: alias('panelist.num'),
  category: alias('panelist.category'),

  isDisabled: not(
    'permissions.write'
  ),

  intPoints: computed(
    'points', function() {
      return parseInt(this.points);
    }
  ),

  isOfficial: equal(
    'kind',
    'Official',
  ),

  isSinging: equal(
    'category',
    'Singing',
  ),

  isOfficialSinging: and(
    'isOfficial',
    'isSinging',
  ),

  isPerformance: equal(
    'category',
    'Performance',
  ),

  isOfficialPerformance: and(
    'isOfficial',
    'isPerformance',
  ),

  isPractice: equal(
    'kind',
    'Practice',
  ),

  statusOptions: [
    'New',
    'Validated',
    'Cleared',
    'Flagged',
    'Revised',
    'Confirmed',
  ],
  categoryOptions: [
    'Music',
    'Performance',
    'Singing',
  ],
  kindOptions: [
    'Official',
    'Practice',
    'Composite',
  ],

  rowClass: computed(
    'kind', function() {
      if (this.category === 'Music') {
        return 'warning';
      } else if (this.category === 'Performance') {
        return 'success';
      } else if (this.category === 'Singing') {
        return 'info';
      } else {
        return null;
      }
    }
  ),

  panelistName: alias('panelist.person.lastName'),
  songNum: alias('song.num'),
  appearanceId: alias('song.appearance.id'),
});
