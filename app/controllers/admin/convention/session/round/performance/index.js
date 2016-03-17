import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  songSortProperties: ['order',],
  songsSorted: Ember.computed.sort(
    'model.songs',
    'songSortProperties'
  ),

});
