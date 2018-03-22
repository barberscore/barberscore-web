import Component from '@ember/component';
import { sort, filterBy } from '@ember/object/computed';

export default Component.extend({
  sortedGroupsProperties: [
    'treeSort',
    'name',
  ],
  activeGroups: filterBy(
    'model',
    'status',
    'Active',
  ),
  filteredGroups: filterBy(
    'activeGroups',
    'isOrg',
    true,
  ),
  sortedGroups: sort(
    'filteredGroups',
    'sortedGroupsProperties'
  ),
});
