import Controller from '@ember/controller';

export default Controller.extend({
  isCollapsed: false,
  actions: {
    collapseHeader() {
      this.toggleProperty('isCollapsed');
    },
  }
});
