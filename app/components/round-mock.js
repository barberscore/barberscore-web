import Component from '@ember/component';
import { equal } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import config from '../config/environment';

export default Component.extend({
  store: service(),
  flashMessages: service(),
  isProduction: equal(
    config.environment,
    'production',
  ),
  mockRound: task(function *() {
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
