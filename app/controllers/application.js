// app/controllers/application.js
import Ember from 'ember';

export default Ember.Controller.extend({
  isCollapsed: true,
  sess: Ember.inject.service('session'),
  actions: {
    toggleCollapsed() {
      this.toggleProperty('isCollapsed');
    },
    invalidateSession() {
      this.get('sess').invalidate();
    }
  }
});
