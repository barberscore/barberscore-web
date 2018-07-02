import { sort } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  sortedConventionsProperties: [
    'startDate',
  ],
  sortedConventions: sort(
    'model',
    'sortedConventionsProperties'
  ),
});


