import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),
  store: Ember.inject.service(),
  sessionCall: Ember.computed(function() {
    return this.get('store').query('session', {
      'status': 4, // TODO HARDCODED
      'page_size': 100
    });
  }),
  sessionFilter: Ember.computed(
    'sessionCall.@each.kind',
    'model.group.kind',
    function() {
      return this.get('sessionCall').filterBy('kind', this.get('model.group.kind'));
    }
  ),
  sessionSortProperties: [
    'nomen',
  ],
  sessionOptions: Ember.computed.sort(
    'sessionFilter',
    'sessionSortProperties'
  ),
  saveEntry: task(function* (){
    try {
      let entry = yield this.get('model').save();
      // this.store.pushPayload('entry', entry);
      this.get('flashMessages').success('Saved');
      this.transitionToRoute('dashboard.group-manager.group.entries.entry', entry);
    } catch(e) {
      e.errors.forEach((error) => {
        this.get('flashMessages').danger(error.detail);
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
