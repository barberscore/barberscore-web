import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  flashMessage: Ember.get(this, 'flashMessages'),
  actions: {
    validateRepertory() {
      this.model.validate()
      .then((response) => {
        this.store.pushPayload('repertory', response);
        this.get('flashMessage').success("Validated!");
      });
    },
    invalidateRepertory() {
      this.model.invalidate()
      .then((response) => {
        this.store.pushPayload('repertory', response);
        this.get('flashMessage').success("Invalidated!");
      });
    },
  },
});
