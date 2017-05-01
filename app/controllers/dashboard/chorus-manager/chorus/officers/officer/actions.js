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
    deleteOfficer() {
      this.model.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
        this.transitionToRoute('dashboard.chorus-manager.chorus.officers');
      });
    },
  },
});
