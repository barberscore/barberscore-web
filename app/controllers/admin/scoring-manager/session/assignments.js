import Ember from 'ember';

export default Ember.Controller.extend({
  isCollapsed: false,
  actions: {
    collapseHeader() {
      this.toggleProperty('isCollapsed');
    },
  }
});
