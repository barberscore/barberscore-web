import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { not, sort } from '@ember/object/computed';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  store: service(),
  customCollapsed: true,
  isDisabled: not(
    'model.permissions.write',
  ),
  sortedRepertoriesProperties: [
    'isNew',
    'nomen',
  ],
  sortedRepertories: sort(
    'model.repertories',
    'sortedRepertoriesProperties'
  ),
  flashMessages: service(),
  searchChart: task(function* (term){
    yield timeout(600);
    let charts = yield this.get('store').query('chart', {
      'nomen__icontains': term,
      'status': 10,
      'page_size': 1000
      });
    return charts;
  }),
  deleteRepertory: task(function *(repertory) {
    try {
      yield repertory.destroyRecord();
      this.get('flashMessages').success("Deleted!");
    } catch(e) {
      this.get('flashMessages').danger("Problem!");
    }
  }).drop(),
  createRepertory: task(function *() {
    yield this.get('store').createRecord('repertory', {
      group: this.get('model'),
      status: 10,
    });
  }).drop(),
  saveRepertory: task(function* (repertory){
    try {
      yield repertory.save();
      this.get('flashMessages').success('Saved');
    } catch(e) {
      e.errors.forEach((error) => {
        this.get('flashMessages').danger(error.detail);
      })
    }
  }),
  actions: {
    cancelRepertory(repertory){
      repertory.deleteRecord();
    },
  }
});
