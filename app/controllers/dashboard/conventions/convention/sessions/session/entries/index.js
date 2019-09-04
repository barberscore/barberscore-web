import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';

export default Controller.extend({
  sortedEntriesProperties: [
    'name',
  ],
  sortedEntries: sort(
    'model.entries',
    'sortedEntriesProperties'
  ),
});
