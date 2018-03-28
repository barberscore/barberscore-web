import { filterBy, sort } from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
  sortedGroupsProperties: [
    'kind',
    'name',
  ],
  filteredGroups: filterBy(
    'model.group.children',
    'status',
    'Active',
  ),
  sortedGroups: sort(
    'filteredGroups',
    'sortedGroupsProperties'
  ),
});
