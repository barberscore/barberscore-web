import Ember from 'ember';
import config from '../../../config/environment';
import { task } from 'ember-concurrency';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),
  uploadPhoto: task(function * (file) {
    try {
      const host = config.APP.API_HOST;
      const namespace = config.APP.API_NAMESPACE;
      const target = this.get('model.id');
      let response = yield file.upload(`${host}/${namespace}/group/${target}/image`);
      this.set('model.image', response.body.image);
      yield this.get('model').save();
      this.get('flashMessages').success("Saved!");
    } catch (e) {
      this.get('flashMessages').danger("Upload Failed!");
    }
  }).drop(),
  activateGroupModal: false,
  activateGroupModalError: false,
  activateGroup: task(function *() {
    try {
      let group = yield this.model.activate({
        'by': this.get('currentUser.user.id'),
      });
      this.store.pushPayload('group', group);
      this.set('activateGroupModal', false);
      this.set('activateGroupModalError', false);
      this.get('flashMessages').success("Deactivated!");
    } catch(e) {
      this.set('activateGroupModalError', true);
    }
  }).drop(),
  deactivateGroupModal: false,
  deactivateGroupModalError: false,
  deactivateGroup: task(function *() {
    try {
      let group = yield this.model.deactivate({
        'by': this.get('currentUser.user.id'),
      });
      this.store.pushPayload('group', group);
      this.set('deactivateGroupModal', false);
      this.set('deactivateGroupModalError', false);
      this.get('flashMessages').success("Deactivated!");
    } catch(e) {
      this.set('deactivateGroupModalError', true);
    }
  }).drop(),
});
