import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { not, sort } from '@ember/object/computed';
import { task } from 'ember-concurrency';

export default Component.extend({
  store: service(),
  isDisabled: not(
    'model.permissions.write',
  ),
  sortedRepertoriesProperties: [
    'nomen',
  ],
  sortedRepertories: sort(
    'model.repertories',
    'sortedRepertoriesProperties'
  ),
  flashMessages: service(),
  deleteRepertory: task(function *(repertory) {
    try {
      yield repertory.destroyRecord();
      this.get('flashMessages').success("Deleted!");
    } catch(e) {
      this.get('flashMessages').danger("Problem!");
    }
  }).drop(),
});
