import Component from '@ember/component';
import { sort } from '@ember/object/computed';

export default Component.extend({
  sortProperties: [
    'statusSort:asc',
    'groupKindSort:asc',
  ],
  sortedSessions: sort(
    'model',
    'sortProperties'
  ),
});
