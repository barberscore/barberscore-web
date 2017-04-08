import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    sortEntriesBy(entrySortProperties) {
      this.set('entrySortProperties', [entrySortProperties]);
    },
    penalizeEligibility(entry) {
      entry.penalizeEligibility();
    },
  },
  entrySortProperties: [
    'entry.entryscore.rank:asc',
    'group.nomen:asc',
  ],
  sortedEntries: Ember.computed.sort(
    'model.entries',
    'entrySortProperties'
  ),
});
