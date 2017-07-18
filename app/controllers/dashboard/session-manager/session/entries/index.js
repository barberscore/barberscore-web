import Ember from 'ember';

export default Ember.Controller.extend({
  entrySortProperties: [
    'nomen:asc',
  ],
  sortedEntries: Ember.computed.sort(
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
    deleteEntry(entry){
      entry.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
      });
    },
  }
});
