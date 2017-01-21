import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  searchTask: task(function* (term){
    yield timeout(600);
    return this.get('store').query('judge', {'nomen__icontains': term})
      .then((data) => data);
  }),
  actions: {
    transitionJudge(judge) {
      this.transitionToRoute('admin.judge-manager.judge', judge);
    },
  }
});
