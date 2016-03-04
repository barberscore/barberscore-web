import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  actions: {
    deleteRecord(performer) {
      performer.destroyRecord();
    }
  }
});
