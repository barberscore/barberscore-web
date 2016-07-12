import Ember from 'ember';

export default Ember.Controller.extend({
  isHeaderCollapsed: false,
  actions: {
    collapseHeader() {
      this.toggleProperty('isHeaderCollapsed');
    },
  }
});
