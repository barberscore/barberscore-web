import Component from '@ember/component';
import { sort, filterBy } from '@ember/object/computed';

export default Component.extend({
  sortedOfficersProperties: [
    'groupName',
  ],
  filteredOfficers: filterBy(
    'model.person.officers',
    'status',
    'Active',
  ),
  sortedOfficers: sort(
    'filteredOfficers',
    'sortedOfficersProperties'
  ),
});
