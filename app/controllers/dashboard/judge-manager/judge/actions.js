import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  flashMessages: service(),
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
