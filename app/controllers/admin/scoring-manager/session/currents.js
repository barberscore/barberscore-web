import Ember from 'ember';

export default Ember.Controller.extend({
  isCollapsed: true,
  actions: {
    collapseHeader() {
      this.toggleProperty('isCollapsed');
    },
  }
});
