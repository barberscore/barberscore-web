import Component from '@ember/component';
import { sort } from '@ember/object/computed';

export default Component.extend({
  sortedSongsProperties: [
    'num',
  ],
  sortedSongs: sort(
    'model.songs',
    'sortedSongsProperties'
  ),
  actions: {
    saveSong(song){
      song.save();
    },
  }
});
