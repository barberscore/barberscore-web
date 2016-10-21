import Ember from 'ember';

const {inject} = Ember;

export default Ember.Controller.extend({
  session: inject.service(),
  isCollapsed: true,
  actions: {
    toggleCollapsed() {
      this.toggleProperty('isCollapsed');
    }
  },
  currentUser: Ember.inject.service('current-user')
});
