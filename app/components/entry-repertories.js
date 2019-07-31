import Component from '@ember/component';
import { sort } from '@ember/object/computed';

export default Component.extend({
  sortedRepertoriesProperties: [
    'title',
  ],
  sortedRepertories: sort(
    'model.repertories',
    'sortedRepertoriesProperties'
  ),
});
