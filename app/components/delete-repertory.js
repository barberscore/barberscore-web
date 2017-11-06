import { inject as service } from '@ember/service';
import Component from '@ember/component';
import {
  task
} from 'ember-concurrency';

export default Component.extend({
  store: service(),
  flashMessages: service(),
  deleteRepertory: task(function *() {
    try {
      yield this.model.destroyRecord();
      this.get('flashMessages').success("Deleted!");
    } catch(e) {
      this.get('flashMessages').danger("Problem!");
    }
  }).drop(),
});
