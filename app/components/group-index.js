import Component from '@ember/component';
import { sort, filterBy } from '@ember/object/computed';

export default Component.extend({
  sortedGroupsProperties: [
    'treeSort',
    'name',
  ],
  filteredGroups: filterBy(
    'model',
    'status',
    'Active',
  ),
  sortedGroups: sort(
    'filteredGroups',
    'sortedGroupsProperties'
  ),
});
