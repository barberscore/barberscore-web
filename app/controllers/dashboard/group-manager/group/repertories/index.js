import Ember from 'ember';

export default Ember.Controller.extend({
  isDisabled: Ember.computed.not(
    'model.permissions.write',
  ),
  sortedRepertoriesProperties: [
    'nomen',
  ],
  sortedRepertories: Ember.computed.sort(
    'model.repertories',
    'sortedRepertoriesProperties'
  ),
  actions: {
    createRepertory() {
      this.transitionToRoute('dashboard.group-manager.group.repertories.new');
    },
  },
});
