import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  currentUser: service(),
  flashMessages: service(),
  session: service(),
  model: null,
  actions: {
    invalidateSession () {
      this.session.invalidate();
    },
  }
});
