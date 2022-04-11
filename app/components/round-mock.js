import Component from '@ember/component';
import { equal } from '@ember/object/computed';
import { inject as service } from '@ember/service';
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
  mockRound: task(function *() {
    try {
      let round = yield this.model.mock({
        'by': this.get('currentUser.user.id'),
      });
      yield this.store.pushPayload('round', round);
      this.model.hasMany('appearances').reload();
      this.flashMessages.success("Mocked!");
    } catch(e) {
      this.flashMessages.error(e);
    }
  }).drop(),
});
