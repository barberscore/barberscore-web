import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  store: service(),
  flashMessages: service(),
  startAppearance: task(function *() {
    try {
      let appearance = yield this.model.start({
        'by': this.get('currentUser.user.id'),
      });
      yield this.store.pushPayload('appearance', appearance);
      this.flashMessages.success("Started!");
    } catch(e) {
      this.flashMessages.error(e);
    }
  }).drop(),
});
