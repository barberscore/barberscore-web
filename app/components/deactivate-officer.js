import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  store: service(),
  flashMessages: service(),
  actions: {
    deactivateOfficer() {
      this.get('model').deactivate()
      .then((response) => {
        this.get('store').pushPayload('officer', response);
        this.get('flashMessages').success("Deactivated");
      });
    },
  }
});
