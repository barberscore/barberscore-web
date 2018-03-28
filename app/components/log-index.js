import Component from '@ember/component';
import { sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  store: service(),
  logs: computed(
    'model',
    function () {
      return this.get('store').query('statelog', {
        'object_id': this.get('model.id'),
      });
  }),
  sortProperties: [
    'timestamp:asc',
  ],
  sortedLogs: sort(
    'logs',
    'sortProperties'
  ),
});
