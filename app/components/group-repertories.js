import { not, filterBy, sort } from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
  isDisabled: not(
    'model.permissions.write',
  ),
  sortedRepertoriesProperties: [
    'nomen',
  ],
  sortedRepertories: sort(
    'model.repertories',
    'sortedRepertoriesProperties'
  ),
});
