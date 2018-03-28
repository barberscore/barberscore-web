import Component from '@ember/component';
import { sort } from '@ember/object/computed';

export default Component.extend({
  sortProperties: [
    'startDate:asc',
    'name:asc',
  ],
  sortedConventions: sort(
    'model',
    'sortProperties'
  ),
});
