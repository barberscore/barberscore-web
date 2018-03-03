import { sort } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  collapsed: false,
  entrySortProperties: [
    'nomen:asc',
  ],
  sortedItems: sort(
    'model.entries',
    'entrySortProperties'
  ),
  actions: {
    sortBy(entrySortProperties) {
      this.set('entrySortProperties', [entrySortProperties]);
    },
    createEntry() {
      this.transitionToRoute('dashboard.session-manager.session.entries.new');
    },
  }
});
