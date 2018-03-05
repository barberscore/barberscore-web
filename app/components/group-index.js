import Component from '@ember/component';
import { sort } from '@ember/object/computed';

export default Component.extend({
  sortedGroupsProperties: [
    'treeSort',
    'name',
  ],
  sortedGroups: sort(
    'model',
    'sortedGroupsProperties'
  ),
});
