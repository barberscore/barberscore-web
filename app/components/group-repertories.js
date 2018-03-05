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
  createRepertoryModal: false,
  createRepertoryModalError: false,
  saveRepertory: task(function* (chart){
    try {
      let repertory = yield this.get('store').createRecord('repertory', {
        chart: chart,
        group: this.get('model'),
      }).save();
      let payload = yield repertory.activate({
        'by': this.get('currentUser.user.id'),
      });
      this.get('store').pushPayload('repertory', payload);
      this.set('createRepertoryModal', false);
      this.set('createRepertoryModalError', false);
      this.get('flashMessages').success("Created!");
      // this.get('router').transitionTo('dashboard.group-manager.group.repertories.repertory', this.get('model'), repertory.get('id'));
    } catch(e) {
      e.errors.forEach((e) => {
        this.set('createRepertoryModalError', true);
        this.get('flashMessages').danger(e.detail);
      })
    }
  }).drop(),
  actions: {
    cancelRepertory(repertory){
      repertory.deleteRecord();
    },
  }
});
