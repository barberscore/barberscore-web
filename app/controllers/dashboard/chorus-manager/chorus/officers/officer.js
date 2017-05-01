import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  flashMessage: Ember.get(this, 'flashMessages'),
  actions: {
    activateOfficer() {
      this.get('model').activate()
      .then((response) => {
        this.get('store').pushPayload('officer', response);
        this.get('flashMessages').success("Activated");
      });
    },
    deactivateOfficer() {
      this.get('model').deactivate()
      .then((response) => {
        this.get('store').pushPayload('officer', response);
        this.get('flashMessages').success("Deactivated");
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
