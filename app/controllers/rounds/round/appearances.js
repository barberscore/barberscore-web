import { sort } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  appearancesSortProperties: [
    'num',
  ],
  sortedAppearances: sort(
    'model.appearances',
    'appearancesSortProperties'
  ),
});
