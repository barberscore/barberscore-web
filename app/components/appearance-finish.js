import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  store: service(),
  flashMessages: service(),
  finishAppearance: task(function *() {
    try {
      yield this.model.finish({
        'by': this.get('currentUser.user.id'),
      });
      this.model.reload();
      this.flashMessages.success("Finished!");
    } catch(e) {
      this.flashMessages.error(e);
    }
  }).drop(),
});
