import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';

export default Controller.extend({
  sortedContestsProperties: [
    'treeSort',
  ],
  sortedContests: sort(
    'model.contests',
    'sortedContestsProperties'
  ),
});
