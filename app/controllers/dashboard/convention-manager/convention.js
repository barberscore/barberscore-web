import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Controller.extend({
  currentUser: Ember.inject.service(),
  store: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  publishConventionModal: false,
  publishConventionModalError: false,
  publishConvention: task(function *() {
    try {
      let convention = yield this.model.publish({
        'by': this.get('currentUser.user.id')
      });
      this.store.pushPayload('convention', convention);
      this.set('publishConventionModal', false);
      this.set('publishConventionModalError', false);
      this.get('flashMessages').success("Published!");
    } catch(e) {
      this.set('publishConventionModalError', true);
    }
  }).drop(),
});
