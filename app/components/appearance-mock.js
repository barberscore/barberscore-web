import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { equal } from '@ember/object/computed';
import { task } from 'ember-concurrency';
import config from '../config/environment';

export default Component.extend({
  store: service(),
  flashMessages: service(),
  isProduction: equal(
    config.environment,
    'production',
  ),
  mockAppearance: task(function *() {
    try {
      let appearance = yield this.model.mock({
        'by': this.get('currentUser.user.id'),
      });
      this.store.pushPayload('appearance', appearance);
      this.get('model.songs.@each.chart').invoke('reload');
      this.flashMessages.success("Mocked!");
    } catch(e) {
      this.flashMessages.error(e);
    }
  }).drop(),
});
