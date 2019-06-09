import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { equal } from '@ember/object/computed';
import { task } from 'ember-concurrency';
import ENV from '../config/environment';



export default Component.extend({
  store: service(),
  flashMessages: service(),
  host: ENV.APP.API_HOST,
  isProduction: equal(
    'host',
    'https://www.barberscore.com',
  ),
  mockAppearance: task(function *() {
    try {
      let appearance = yield this.model.mock({
        'by': this.get('currentUser.user.id'),
      });
      yield this.store.pushPayload('appearance', appearance);
      this.flashMessages.success("Mocked!");
    } catch(e) {
      this.flashMessages.error(e);
    }
  }).drop(),
});
