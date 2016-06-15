import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    savePrimary(primary) {
      this.model.set('primary', primary);
      this.model.save()
      .then(() => {
        // flashMessages.success('Success');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
  }
});
