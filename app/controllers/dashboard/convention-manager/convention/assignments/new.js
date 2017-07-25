import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),
  store: Ember.inject.service(),
  judgeCall: Ember.computed(function() {
    return this.get('store').query('person', {
      'officers__office__is_judge_manager': true,
      'page_size': 1000,
    });
  }),
  judgeUniques: Ember.computed.uniq(
    'judgeCall',
  ),
  judgeOptionsProperties: [
    'nomen',
  ],
  judgeOptions: Ember.computed.sort(
    'judgeUniques',
    'judgeOptionsProperties',
  ),
  saveAssignment: task(function* (){
    try {
      yield this.get('model').save();
      this.get('flashMessages').success('Saved');
      this.transitionToRoute('dashboard.convention-manager.convention.assignments.index');
    } catch(e) {
      e.errors.forEach((error) => {
        this.get('flashMessages').danger(error.detail);
      })
    }
  }),
  actions: {
    clearAssignment() {
      this.get('model').deleteRecord();
      this.transitionToRoute('dashboard.convention-manager.convention.assignments.index');
    }
  },
});
