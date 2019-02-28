import { alias, not, equal } from '@ember/object/computed';
import { computed } from '@ember/object';
import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  status: DS.attr('score-status'),
  points: DS.attr('number'),
  isFlagged: DS.attr('boolean'),
  song: DS.belongsTo('song', {async: true}),
  panelist: DS.belongsTo('panelist', {async: true}),
  permissions: DS.attr(),

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

  kind: alias('panelist.kind'),
  num: alias('panelist.num'),
  category: alias('panelist.category'),

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
