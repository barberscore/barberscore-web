import { not, sort } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  isDisabled: not(
    'model.permissions.write',
  ),
  sortedRepertoriesProperties: [
    'nomen',
  ],
  sortedRepertories: sort(
    'model.repertories',
    'sortedRepertoriesProperties'
  ),
  actions: {
    createRepertory() {
      this.transitionToRoute('dashboard.group-manager.group.repertories.new');
    },
  },
});
