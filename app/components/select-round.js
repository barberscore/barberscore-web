import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    saveCurrent(current) {
      this.model.set('current', current);
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
