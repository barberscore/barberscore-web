import Component from '@ember/component';
import { sort } from '@ember/object/computed';

export default Component.extend({
  collapsedNote: true,
  sortedGroupsProperties: [
    'treeSort',
    'name',
  ],
  sortedGroups: sort(
    'model',
    'sortedGroupsProperties'
  ),
});
