import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    createRepertory() {
      this.transitionToRoute('dashboard.group-manager.group.repertories.new');
    },
  },
});
