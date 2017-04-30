import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  flashMessage: Ember.get(this, 'flashMessages'),
  actions: {
    activateOfficer() {
      this.model.activate()
      .then((response) => {
        this.store.pushPayload('officer', response);
        this.get('flashMessages').success("Activated");
      });
    },
    deactivateOfficer() {
      this.model.deactivate()
      .then((response) => {
        this.store.pushPayload('officer', response);
        this.get('flashMessages').success('Saved');
      });
    },
  },
});
