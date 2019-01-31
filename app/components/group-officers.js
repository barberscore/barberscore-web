import { not, sort } from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
  isDisabled: not(
    'model.permissions.write',
  ),
  sortedOfficersProperties: [
    'personLast',
    'personName',
  ],
  sortedOfficers: sort(
    'model.officers',
    'sortedOfficersProperties'
  ),
});
