import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  store: service(),
  flashMessages: service(),
  startCompetitorModal: false,
  startCompetitorModalError: false,
  startCompetitor: task(function *() {
    try {
      yield this.model.start({
        'by': this.get('currentUser.user.id'),
      });
      this.get('model').reload();
      this.set('startCompetitorModal', false);
      this.set('startCompetitorModalError', false);
      this.get('flashMessages').success("Started!");
    } catch(e) {
      this.set('startCompetitorModalError', true);
    }
  }).drop(),
});
