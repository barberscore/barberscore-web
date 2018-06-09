import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  store: service(),
  flashMessages: service(),
  scratchCompetitorModal: false,
  scratchCompetitorModalError: false,
  scratchCompetitor: task(function *() {
    try {
      yield this.model.scratch({
        'by': this.get('currentUser.user.id'),
      });
      this.get('model').reload();
      this.set('scratchCompetitorModal', false);
      this.set('scratchCompetitorModalError', false);
      this.get('flashMessages').success("Scratched!");
    } catch(e) {
      this.set('scratchCompetitorModalError', true);
    }
  }).drop(),
});
