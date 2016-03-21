import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    drawRound(round) {
      const flashMessages = Ember.get(this, 'flashMessages');
      round.draw()
      .then(() => {
        // flashMessages.success('Success');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
      round.reload();
    },
  },
});
