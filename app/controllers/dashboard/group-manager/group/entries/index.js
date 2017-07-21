import Ember from 'ember';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),
  isDisabled: Ember.computed.not(
    'model.permissions.write',
  ),
  filteredEntries: Ember.computed.filterBy(
    'model.entries',
    'notAnnounced'
  ),
  sortedEntriesProperties: [
    'statusSort',
  ],
  sortedEntries: Ember.computed.sort(
    'filteredEntries',
    'sortedEntriesProperties'
  ),
  actions: {
    createEntry(){
      this.transitionToRoute('dashboard.group-manager.group.entries.new');
    },
  }
});
