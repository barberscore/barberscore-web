import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { task } from 'ember-concurrency';

export default Component.extend({
  store: service(),
  router: service(),
  flashMessages: service(),
  disableCheckAppearance: false,
  disableButton: computed(
    'model.isDisabled',
    'disableCheckAppearance', {
      get() {
        return this.get('model.isDisabled') || this.get('disableCheckAppearance');
      }
    }
  ),
  verifyAppearance: task(function *() {
    try {
      let appearance = yield this.model.verify({
        'by': this.get('currentUser.user.id'),
      });
      yield this.store.pushPayload('appearance', appearance);
      if (this.model.status === 'Variance') {
        this.flashMessages.warning("VARIANCE!");
      } else {
        this.flashMessages.success("Verified");
      }
    } catch(e) {
      e.errors.forEach((error) => {
        let res = JSON.parse(error.detail);
        this.flashMessages.danger(res.errors.status);
      })
    }
  }).drop(),
});
