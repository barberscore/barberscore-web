import Ember from 'ember';

export default Ember.Controller.extend({
  flashMessage: Ember.get(this, 'flashMessages'),
  actions: {
    listConvention() {
      this.model.list_fsm()
      .then(response => {
        this.store.pushPayload('convention', response);
      });
    },
    openConvention() {
      this.model.open_fsm()
      .then(response => {
        this.store.pushPayload('convention', response);
      });
    },
    startConvention() {
      this.model.start_fsm()
      .then(response => {
        this.store.pushPayload('convention', response);
      });
    },
    endConvention() {
      this.model.end_fsm()
      .then(response => {
        this.store.pushPayload('convention', response);
      });
    },
  }
});
