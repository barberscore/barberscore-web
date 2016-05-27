import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    updateScore(points) {
      this.model.set('points', points);
      this.model.save();
    },
  }
});
