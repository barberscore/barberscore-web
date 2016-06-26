import Ember from 'ember';

export default Ember.Controller.extend({
  isHeaderCollapsed: true,
  actions: {
    collapseHeader() {
      this.toggleProperty('isHeaderCollapsed');
    },
  }
});
