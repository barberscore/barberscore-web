import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';

export default Controller.extend({
  sortedEntriesProperties: [
    'name:asc',
  ],
  sortedEntries: sort(
    'model.entries',
    'sortedEntriesProperties'
  ),
  sortedContestsProperties: [
    'treeSort',
  ],
  sortedContests: sort(
    'model.session.contests',
    'sortedContestsProperties'
  ),
});
