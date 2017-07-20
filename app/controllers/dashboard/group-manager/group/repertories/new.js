import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),
  store: Ember.inject.service(),
  searchChart: task(function* (term){
    yield timeout(600);
    let charts = yield this.get('store').query('chart', {
      'nomen__icontains': term,
      'status': 10,
      'page_size': 1000
      });
    return charts;
  }),
  saveRepertory: task(function* (){
    try {
      yield this.get('model').save();
      this.get('flashMessages').success('Saved');
      this.transitionToRoute('dashboard.group-manager.group.repertories.index');
    } catch(e) {
      e.errors.forEach((error) => {
        this.get('flashMessages').danger(error.detail);
      })
    }
  }),
  actions: {
    clearRepertory() {
      this.get('model').deleteRecord();
      this.transitionToRoute('dashboard.group-manager.group.repertories.index');
    }
  },
});
