import Ember from 'ember';

export default Ember.Controller.extend({
  currentUser: Ember.inject.service('current-user'),
  sortProperties: [
    'entityKindSort:asc',
    'name',
  ],
  sortedItems: Ember.computed.sort(
    'model',
    'sortProperties'
  ),
  actions: {
    createAward() {
      this.transitionToRoute('dashboard.award-manager.new');
    },
  }
});
