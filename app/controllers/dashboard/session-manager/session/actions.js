import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  actions: {
    openSession() {
      this.model.open()
      .then(response => {
        this.store.pushPayload('session', response);
      });
    },
    closeSession() {
      this.model.close()
      .then(response => {
        this.store.pushPayload('session', response);
      });
    },
    verifySession() {
      this.model.verify()
      .then(response => {
        this.store.pushPayload('session', response);
      });
    },
    validateCurrent() {
      this.model.get('current').then(current => {
        current.validate()
        .then(response => {
          this.store.pushPayload('round', response);
        });
      });
    },
  }
});
