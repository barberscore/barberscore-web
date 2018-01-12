import { sort } from '@ember/object/computed';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { task } from 'ember-concurrency';

export default Controller.extend({
  flashMessages: service(),
  store: service(),
  sessionCall: computed(function() {
    return this.get('store').query('session', {
      'status': 4, // TODO HARDCODED
      'is_invitational': false,
      'page_size': 100
    });
  }),
  sessionFilter: computed(
    'sessionCall.@each.kind',
    'model.group.kind',
    function() {
      return this.get('sessionCall').filterBy('kind', this.get('model.group.kind'));
    }
  ),
  sessionSortProperties: [
    'nomen',
  ],
  sessionOptions: sort(
    'sessionFilter',
    'sessionSortProperties'
  ),
  saveEntry: task(function* (){
    try {
      let entry = yield this.get('model').save();
      this.get('flashMessages').success('Saved');
      this.transitionToRoute('dashboard.group-manager.group.entries.entry', entry);
    } catch(e) {
      e.errors.forEach((e) => {
        this.get('flashMessages').danger(e.detail);
      })
    }
  }),
  actions: {
    clearEntry() {
      this.get('model').deleteRecord();
      this.transitionToRoute('dashboard.group-manager.group.entries.index');
    }
  },
});
