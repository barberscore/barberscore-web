import { sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  store: service(),
  flashMessages: service(),
  sortProperties: [
    'statusSort:asc',
    'kindSort:asc',
    'name:asc',
  ],
  sortedGroups: sort(
    'model.groups',
    'sortProperties'
  ),
  actions: {
    sortBy(sortProperties) {
      this.set('sortProperties', [sortProperties]);
    },
  }
});
