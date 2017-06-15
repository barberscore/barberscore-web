import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  scheduleConvention: task(function *() {
    let userID = this.get('currentUser.user.id');
    try {
      let convention = yield this.model.schedule({
        'by': userID
      });
      this.store.pushPayload('convention', convention);
      this.get('flashMessages').success("Scheduled!");
    } catch(e) {
      this.get('flashMessages').danger("Please check that all fields are entered!");
    }
  }).drop(),
  openConvention: task(function *() {
    let userID = this.get('currentUser.user.id');
    try {
      let convention = yield this.model.open({
        'by': userID
      });
      this.store.pushPayload('convention', convention);
      this.get('flashMessages').success("Scheduled!");
    } catch(e) {
      this.get('flashMessages').danger("Please check that all fields are entered!");
    }
  }).drop(),
});
