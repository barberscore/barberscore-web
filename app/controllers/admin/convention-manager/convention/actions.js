import Ember from 'ember';

export default Ember.Controller.extend({
  flashMessage: Ember.get(this, 'flashMessages'),
  actions: {
    listConvention() {
      this.model.list_fsm()
      .then(response => {
        this.store.pushPayload('convention', response);
      })
      .catch(() => {
        this.get('flashMessages').danger("Error" );
      });
    },
    openConvention() {
      this.model.open_fsm()
      .then(response => {
        this.store.pushPayload('convention', response);
      })
      .catch(() => {
        this.get('flashMessages').danger("Error" );
      });
    },
    startConvention() {
      this.model.start_fsm()
      .then(response => {
        this.store.pushPayload('convention', response);
      })
      .catch(() => {
        this.get('flashMessages').danger("Error" );
      });
    },
    endConvention() {
      this.model.end_fsm()
      .then(response => {
        this.store.pushPayload('convention', response);
      })
      .catch(() => {
        this.get('flashMessages').danger("Error" );
      });
    },
  }
});
