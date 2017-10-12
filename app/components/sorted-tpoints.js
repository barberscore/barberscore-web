import { sort } from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
  songSortProperties: [
    'num',
  ],
  sortedSongs: sort(
    'songs',
    'songSortProperties'
  ),
});
