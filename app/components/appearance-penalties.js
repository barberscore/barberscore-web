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
  appearancePenalityModal: false,
  autosave: task(function* (song, penalties){
    yield song.set('penalties', penalties);
    try {
      yield song.save();
      this.get('model').reload();
      this.flashMessages.success("Saved");
      if (penalties.length) {
        this.set('appearancePenalityModal', true);
      }
    } catch(e) {
      this.set('appearancePenalityModal', false);
      e.errors.forEach((error) => {
        this.flashMessages.danger(error.detail);
      })
    }
  }).restartable(),
});
