import Component from '@ember/component';
import { sort } from '@ember/object/computed';
import { task } from 'ember-concurrency';

export default Component.extend({
  sortedSongsProperties: [
    'num',
  ],
  sortedSongs: sort(
    'model.songs',
    'sortedSongsProperties'
  ),
  autosave: task(function* (song, chart){
    song.set('chartId', chart.get('id'));
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
