import { not, sort, filterBy } from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
  isDisabled: not(
    'model.permissions.write',
  ),
  sortedOfficersProperties: [
    'personLast',
    'personName',
  ],
  filteredOfficers: filterBy(
    'model.officers',
    'isActive',
  ),
  sortedOfficers: sort(
    'filteredOfficers',
    'sortedOfficersProperties'
  ),
});
