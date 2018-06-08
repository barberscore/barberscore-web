import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  store: service(),
  flashMessages: service(),
  startAppearanceModal: false,
  startAppearanceModalError: false,
  startAppearance: task(function *() {
    try {
      yield this.model.start({
        'by': this.get('currentUser.user.id'),
      });
      this.get('model').reload();
      this.set('startAppearanceModal', false);
      this.set('startAppearanceModalError', false);
      this.get('flashMessages').success("Started!");
    } catch(e) {
      this.set('startAppearanceModalError', true);
    }
  }).drop(),
});
