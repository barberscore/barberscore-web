import Ember from 'ember';

export default Ember.Controller.extend({
  // store: Ember.inject.service(),
  // flashMessage: Ember.get(this, 'flashMessages'),
  // actions: {
  //   openSession() {
  //     this.model.open()
  //     .then(response => {
  //       this.store.pushPayload('session', response);
  //     })
  //     .catch(() => {
  //       this.get('flashMessages').danger("Error" );
  //     });
  //   },
  //   closeSession() {
  //     this.model.close()
  //     .then(response => {
  //       this.store.pushPayload('session', response);
  //     })
  //     .catch(() => {
  //       this.get('flashMessages').danger("Error" );
  //     });
  //   },
  //   validateCurrent() {
  //     this.model.get('current').then(current => {
  //       current.validate()
  //       .then(response => {
  //         this.store.pushPayload('round', response);
  //       })
  //       .catch(() => {
  //         this.get('flashMessages').danger("Error" );
  //       });
  //     });
  //   },
  // }
});
