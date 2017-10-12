import { sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
// import { task, timeout } from 'ember-concurrency';

export default Controller.extend({
  flashMessages: service(),
  isSorting: false,
  sortedContestsProperties: [
    'nomen',
  ],
  sortedContests: sort(
    'model.session.contests',
    'sortedContestsProperties'
  ),
  actions: {
    reorderItems(itemModels) {
      itemModels.forEach(function(item, index) {
        item.set('num', index + 1);
      });
    },
    saveOrder() {
      this.get('sortedAppearances').invoke('save');
      this.set('isSorting', false);
      this.get('flashMessages').success('Success');
    }
  }
});
