import { sort } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  appearanceSortProperties: [
    'num:asc',
  ],
  sortedAppearances: sort(
    'model.appearances',
    'appearanceSortProperties'
  ),
});
