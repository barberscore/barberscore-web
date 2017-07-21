import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  activateRepertoryModal: false,
  activateRepertoryModalError: false,
  activateRepertory: task(function *() {
    try {
      let repertory = yield this.model.activate({
        'by': this.get('currentUser.user.id'),
      });
      this.store.pushPayload('repertory', repertory);
      this.set('activateRepertoryModal', false);
      this.set('activateRepertoryModalError', false);
      this.get('flashMessages').success("Deactivated!");
    } catch(e) {
      this.set('activateRepertoryModalError', true);
    }
  }).drop(),
  deactivateRepertoryModal: false,
  deactivateRepertoryModalError: false,
  deactivateRepertory: task(function *() {
    try {
      let repertory = yield this.model.deactivate({
        'by': this.get('currentUser.user.id'),
      });
      this.store.pushPayload('repertory', repertory);
      this.set('deactivateRepertoryModal', false);
      this.set('deactivateRepertoryModalError', false);
      this.get('flashMessages').success("Deactivated!");
    } catch(e) {
      this.set('deactivateRepertoryModalError', true);
    }
  }).drop(),
});
