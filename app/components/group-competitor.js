import Component from '@ember/component';
import { sort } from '@ember/object/computed';

export default Component.extend({
  sortedAppearancesProperties: [
    'roundNum:desc',
  ],
  sortedAppearances: sort(
    'model.appearances',
    'sortedAppearancesProperties',
  ),
});
