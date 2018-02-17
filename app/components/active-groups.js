import Component from '@ember/component';
import { sort, filterBy } from '@ember/object/computed';

export default Component.extend({
  sortedChildrenProperties: [
    'name',
  ],
  filteredChildren: filterBy(
    'model.group.children',
    'status',
    'Active',
  ),
  sortedChildren: sort(
    'filteredChildren',
    'sortedChildrenProperties'
  )
});
