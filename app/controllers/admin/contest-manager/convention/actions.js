import Ember from 'ember';

export default Ember.Controller.extend({
  flashMessage: Ember.get(this, 'flashMessages'),
  actions: {
    startConvention() {
      this.model.start()
      .then(response => {
        this.store.pushPayload('convention', response);
      })
      .catch((error) => {
        console.log(error);
        this.get('flashMessages').danger("Error" );
      });
    },
    endConvention() {
      this.model.end()
      .then(response => {
        this.store.pushPayload('convention', response);
      })
      .catch((error) => {
        console.log(error);
        this.get('flashMessages').danger("Error" );
      });
    },
  }
});
