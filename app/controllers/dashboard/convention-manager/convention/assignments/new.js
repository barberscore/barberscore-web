import { uniq, sort } from '@ember/object/computed';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { task } from 'ember-concurrency';

export default Controller.extend({
  flashMessages: service(),
  store: service(),
  judgeCall: computed(function() {
    return this.get('store').query('person', {
      'officers__office__is_judge_manager': true,
      'page_size': 1000,
    });
  }),
  judgeUniques: uniq(
    'judgeCall',
  ),
  judgeOptionsProperties: [
    'nomen',
  ],
  judgeOptions: sort(
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
