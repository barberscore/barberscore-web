import { not, filterBy, sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  flashMessages: service(),
  isDisabled: not(
    'model.permissions.write',
  ),
  filteredEntries: filterBy(
    'model.entries',
    'notArchived'
  ),
  sortedEntriesProperties: [
    'statusSort',
  ],
  sortedEntries: sort(
    'filteredEntries',
    'sortedEntriesProperties'
  ),
  actions: {
    createEntry(){
      this.transitionToRoute('dashboard.group-manager.group.entries.new');
    },
  }
});
