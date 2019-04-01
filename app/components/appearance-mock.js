import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  store: service(),
  flashMessages: service(),
  mockAppearance: task(function *() {
    try {
      yield this.model.mock({
        'by': this.get('currentUser.user.id'),
      });
      this.model.reload();
      this.flashMessages.success("Mocked!");
    } catch(e) {
      this.flashMessages.error(e);
    }
  }).drop(),
});
