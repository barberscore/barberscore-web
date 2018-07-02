import { sort } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  sortedEntriesProperties: [
    'groupName',
  ],
  sortedEntries: sort(
    'model.entries',
    'sortedEntriesProperties'
  ),
});
