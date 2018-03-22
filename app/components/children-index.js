import Component from '@ember/component';
import { sort, filterBy } from '@ember/object/computed';

export default Component.extend({
  sortedGroupsProperties: [
    'treeSort',
    'name',
  ],
  activeGroups: filterBy(
    'model.children',
    'status',
    'Active',
  ),
  filteredGroups: filterBy(
    'activeGroups',
    'isOrg',
    false,
  ),
  sortedGroups: sort(
    'filteredGroups',
    'sortedGroupsProperties'
  ),
});
