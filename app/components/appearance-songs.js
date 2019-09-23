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
  autosave: task(function* (song, chrt){
    let chart = JSON.parse(chrt);
    song.set('chartId', chart.pk);
    song.set('title', chart.title);
    song.set('arrangers', chart.arrangers);
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
