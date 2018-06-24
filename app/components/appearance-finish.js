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
      this.get('model').reload();
      this.get('flashMessages').success("Finished!");
    } catch(e) {
      this.get('flashMessages').error(e);
    }
  }).drop(),
});
