// app/controllers/application.js
import Ember from 'ember';

export default Ember.Controller.extend({
  sess: Ember.inject.service('session'),
  actions: {
    invalidateSession() {
      this.get('sess').invalidate();
    }
  }
});
