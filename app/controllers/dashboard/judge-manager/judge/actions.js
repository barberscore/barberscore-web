import Ember from 'ember';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),
  actions: {
    activateOfficer() {
      this.model.activate()
      .then(response => {
        this.store.pushPayload('officer', response);
        this.get('flashMessages').success('Activated');
        this.transitionToRoute('dashboard.judge-manager');
      });
    },
    deactivateOfficer() {
      this.model.deactivate()
      .then(response => {
        this.store.pushPayload('officer', response);
        this.get('flashMessages').warning('Deactivated');
        this.transitionToRoute('dashboard.judge-manager');
      });
    },
  }
});
