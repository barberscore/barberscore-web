import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  actions: {
    openSession() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.open()
      .then(response => {
        this.store.pushPayload('session', response);
      })
      .catch(() => {
        flashMessages.danger("Error" );
      });
    },
    closeSession() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.close()
      .then(response => {
        this.store.pushPayload('session', response);
      })
      .catch(() => {
        flashMessages.danger("Error" );
      });
    },
    validateCurrent() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.get('current').then(current => {
        current.validate()
        .then(response => {
          this.store.pushPayload('round', response);
        })
        .catch(() => {
          flashMessages.danger("Error" );
        });
      });
    },
  }
});
