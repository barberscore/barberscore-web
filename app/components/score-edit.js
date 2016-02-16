import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    updateScore(points) {
      this.model.set('points', points);
      this.model.save();
    },
  }
});
