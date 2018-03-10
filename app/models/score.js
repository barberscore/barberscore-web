import { alias, not } from '@ember/object/computed';
import { computed } from '@ember/object';
import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  nomen: DS.attr('string'),
  status: DS.attr('score-status'),
  category: DS.attr('score-category'),
  kind: DS.attr('score-kind'),
  num: DS.attr('number'),
  points: DS.attr('number'),
  original: DS.attr('number'),
  penalty: DS.attr('number'),
  isFlagged: DS.attr('boolean'),
  song: DS.belongsTo('song', {async: true}),
  panelist: DS.belongsTo('panelist', {async: true}),
  permissions: DS.attr(),

  isDisabled: not(
    'permissions.write'
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

  violationOptions: [
    'General',
  ],

  rowClass: computed(
    'kind', function() {
      if (this.get('category') === 'Music') {
        return 'warning';
      } else if (this.get('category') === 'Performance') {
        return 'success';
      } else if (this.get('category') === 'Singing') {
        return 'info';
      } else {
        return null;
      }
    }
  ),

  panelistName: alias('panelist.person.lastName'),
  songNum: alias('song.num'),
});
