import { equal, not, alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import {
  task
} from 'ember-concurrency';

export default Component.extend({
  store: service(),
  flashMessages: service(),
  currentUser: service(),
  isDisabled: not('model.permissions.write'),
  foo: alias(
    'model.person.id',
  ),
  bar: alias(
    'currentUser.user.person.id',
  ),
  promoteMember: task(function *() {
    try {
      this.model.set('isAdmin', true);
      yield this.model.save();
      this.get('flashMessages').success("Made Admin");
    } catch(e) {
      this.get('flashMessages').danger("Problem!");
    }
  }).drop(),
  demoteMember: task(function *() {
    try {
      this.model.set('isAdmin', false);
      yield this.model.save();
      this.get('flashMessages').success("Removed Admin");
    } catch(e) {
      this.get('flashMessages').danger("Problem!");
    }
  }).drop(),
});
