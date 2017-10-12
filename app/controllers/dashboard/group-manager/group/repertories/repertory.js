import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { task } from 'ember-concurrency';

export default Controller.extend({
  store: service(),
  flashMessages: service(),
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
  deleteRepertoryModal: false,
  deleteRepertoryModalError: false,
  deleteRepertory: task(function *() {
    try {
      yield this.model.destroyRecord({
        'by': this.get('currentUser.user.id'),
      });
      this.set('deleteRepertoryModal', false);
      this.set('deleteRepertoryModalError', false);
      this.get('flashMessages').success("Deleted!");
      this.transitionToRoute('dashboard.group-manager.group.repertories.index');
    } catch(e) {
      this.set('deleteRepertoryModalError', true);
    }
  }).drop(),
});
