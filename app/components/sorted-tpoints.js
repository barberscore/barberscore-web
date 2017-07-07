import Ember from 'ember';

export default Ember.Component.extend({
  songSortProperties: [
    'num',
  ],
  sortedSongs: Ember.computed.sort(
    'songs',
    'songSortProperties'
  ),
});
