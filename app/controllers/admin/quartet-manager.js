import Ember from 'ember';

export default Ember.Controller.extend({
  collapseChorus: false,
  actions: {
    collapseHeader() {
      this.toggleProperty('collapseChorus');
    },
  }
});
