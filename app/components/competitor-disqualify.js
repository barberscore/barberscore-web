import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  store: service(),
  flashMessages: service(),
  disqualifyCompetitorModal: false,
  disqualifyCompetitorModalError: false,
  disqualifyCompetitor: task(function *() {
    try {
      yield this.model.disqualify({
        'by': this.get('currentUser.user.id'),
      });
      this.model.reload();
      this.set('disqualifyCompetitorModal', false);
      this.set('disqualifyCompetitorModalError', false);
      this.flashMessages.success("Disqualified!");
    } catch(e) {
      this.set('disqualifyCompetitorModalError', true);
    }
  }).drop(),
});
