import { sort } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  appearancesSortProperties: [
    'entryRank',
  ],
  sortedAppearances: sort(
    'model.appearances',
    'appearancesSortProperties'
  ),
});
