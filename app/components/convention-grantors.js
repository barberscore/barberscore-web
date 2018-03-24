import Component from '@ember/component';
import { sort } from '@ember/object/computed';

export default Component.extend({
  sortedGrantorsProperties: [
    'groupName',
  ],
  sortedGrantors: sort(
    'model.grantors',
    'sortedGrantorsProperties'
  ),
});
