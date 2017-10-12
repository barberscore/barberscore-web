import Controller from '@ember/controller';

export default Controller.extend({
  isCollapsed: true,
  actions: {
    collapseHeader() {
      this.toggleProperty('isCollapsed');
    },
  }
});
