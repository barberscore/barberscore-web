import Ember from 'ember';

export default Ember.Controller.extend({
  entrySortProperties: [
    'nomen:asc',
  ],
  sortedItems: Ember.computed.sort(
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
