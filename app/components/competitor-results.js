import Component from '@ember/component';
import { sort } from '@ember/object/computed';

export default Component.extend({
  tagName: 'tr',
  sortedAppearancesProperties: [
    'roundNum:desc',
  ],
  sortedAppearances: sort(
    'model.appearances',
    'sortedAppearancesProperties',
  ),
});
