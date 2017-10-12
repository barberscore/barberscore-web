import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  store: service(),
  flashMessages: service(),
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
        this.transitionToRoute('dashboard.group-manager.group.officers');
      });
    },
  },
});
