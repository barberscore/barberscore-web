import { filterBy, sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  store: service(),
  flashMessages: service(),
  sortProperties: [
    'isPrimary:desc',
    'name:asc',
    'kindOptions',
  ],
  activeAwards: filterBy(
    'model.awards',
    'status',
    'Active'
  ),
  sortedItems: sort(
    'activeAwards',
    'sortProperties'
  ),
  actions: {
    createAward() {
      this.get('store').createRecord('award', {
        name: this.get('name'),
        children: [],
        contests: [],
      });
    }
  }
});
