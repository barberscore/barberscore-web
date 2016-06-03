import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service()
  // isReview: Ember.computed('song.pointsSorted', function() {
  //   var ultimate = this.get('song.pointsSorted')[0];
  //   var penultimate = this.get('song.pointsSorted')[1];
  //   if (
  //     (penultimate.get('points') - ultimate.get('points') > 5) &&
  //     (ultimate.get('points') === this.get('points'))
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }),
});
