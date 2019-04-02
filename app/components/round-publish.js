import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  currentUser: service(),
  store: service(),
  flashMessages: service(),
  publishRoundModal: false,
  publishRoundModalError: false,
  publishRound: task(function *() {
    try {
      let round = yield this.model.publish({
        'by': this.get('currentUser.user.id')
      });
      this.store.pushPayload('round', round);
      this.get('model.session.rounds').invoke('reload');
      this.get('model.appearances.@each.group').invoke('reload');
      this.set('publishRoundModal', false);
      this.set('publishRoundModalError', false);
      this.flashMessages.success("Published!");
    } catch(e) {
      this.set('publishRoundModalError', true);
    }
  }).drop(),
});
