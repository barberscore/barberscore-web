import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';

export default Controller.extend({
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
