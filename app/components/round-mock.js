import Component from '@ember/component';
import { equal } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import config from '../config/environment';

export default Component.extend({
  store: service(),
  flashMessages: service(),
  currentEnvironment: config.environment,
  isProduction: equal(
    'currentEnvironment',
    'production',
  ),
  mockRound: task(function *() {
    try {
      let round = yield this.model.mock({
        'by': this.get('currentUser.user.id'),
      });
      yield this.store.pushPayload('round', round);
      this.flashMessages.success("Mocked!");
    } catch(e) {
      this.flashMessages.error(e);
    }
  }).drop(),
});
