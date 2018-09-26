import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  store: service(),
  flashMessages: service(),
  finishCompetitorModal: false,
  finishCompetitorModalError: false,
  finishCompetitor: task(function *() {
    try {
      yield this.model.finish({
        'by': this.get('currentUser.user.id'),
      });
      this.model.reload();
      this.set('finishCompetitorModal', false);
      this.set('finishCompetitorModalError', false);
      this.flashMessages.success("Finished!");
    } catch(e) {
      this.set('finishCompetitorModalError', true);
    }
  }).drop(),
});
