import Component from '@ember/component';
import { sort } from '@ember/object/computed';
import { task } from 'ember-concurrency';
import { computed } from '@ember/object';

export default Component.extend({
  isDisabled: computed('model.round.status', function() {
    if (this.get('model.round.status') == 'Published') {
      return true;
    }
    return false;
  }),
  sortedSongsProperties: [
    'num',
  ],
  sortedSongs: sort(
    'model.songs',
    'sortedSongsProperties'
  ),
  autosave: task(function* (song, penalties){
    yield song.set('penalties', penalties);
    try {
      yield song.save();
      this.flashMessages.success("Saved");
    } catch(e) {
      e.errors.forEach((error) => {
        this.flashMessages.danger(error.detail);
      })
    }
  }).restartable(),
});
