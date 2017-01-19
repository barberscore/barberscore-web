import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  flashMessage: Ember.get(this, 'flashMessages'),
  actions: {
    savePrimary(primary) {
      this.get('model').set('primary', primary);
      this.model.save()
      .then(() => {
        this.get('flashMessages').success('Success');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
    openSession() {
      this.model.open()
      .then(response => {
        this.store.pushPayload('session', response);
      })
      .catch(() => {
        this.get('flashMessages').danger("Error" );
      });
    },
    closeSession() {
      this.model.close()
      .then(response => {
        this.store.pushPayload('session', response);
      })
      .catch(() => {
        this.get('flashMessages').danger("Error" );
      });
    },
    validateCurrent() {
      this.model.get('current').then(current => {
        current.validate()
        .then(response => {
          this.store.pushPayload('round', response);
        })
        .catch(() => {
          this.get('flashMessages').danger("Error" );
        });
      });
    },
  }
});
