import Ember from 'ember';

export default Ember.Controller.extend({
  isCurrentCollapsed: false,
  isResultsCollapsed: true,
  isRaw: false,
  actions: {
    collapseHeader() {
      this.toggleProperty('isCurrentCollapsed');
    },
    letsGo() {
      this.toggleProperty('isRaw');
    },
  }
});
