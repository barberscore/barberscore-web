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
  sortedSongs: [],
  init: function() {
    this._super(...arguments);
    this.setSongs();
  },
  setSongs: function() {
    const that = this;
    this.get('model.songs').then(function(songs) {
      const updatedSongs = songs.toSorted(function(a, b) {
        return a.num < b.num ? -1 : 1;
      });
      that.set('sortedSongs', updatedSongs);
    });
  },
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
