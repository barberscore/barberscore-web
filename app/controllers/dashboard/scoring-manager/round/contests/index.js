import Ember from 'ember';
// import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),
  isSorting: false,
  sortedContestsProperties: [
    'nomen',
  ],
  sortedContests: Ember.computed.sort(
    'model.session.contests',
    'sortedContestsProperties'
  ),
  actions: {
    reorderItems(itemModels) {
      let mtCount = this.get('model.mtCount');
      itemModels.forEach(function(item, index) {
        item.set('num', index - mtCount + 1);
      });
    },
    saveOrder() {
      this.get('sortedAppearances').invoke('save');
      this.set('isSorting', false);
      this.get('flashMessages').success('Success');
    }
  }
});
