import Ember from 'ember';

export default Ember.Component.extend({
  isCollapsed: true,
  sess: Ember.inject.service('session'),
  actions: {
    toggleCollapsed() {
      this.toggleProperty('isCollapsed');
    },
    invalidateSession() {
      this.get('sess').invalidate();
    }
  },
});
