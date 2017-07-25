import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  sortProperties: [
    'statusSort:asc',
    'kindSort:asc',
    'name:asc',
  ],
  sortedGroups: Ember.computed.sort(
    'model.groups',
    'sortProperties'
  ),
  actions: {
    sortBy(sortProperties) {
      this.set('sortProperties', [sortProperties]);
    },
  }
});
