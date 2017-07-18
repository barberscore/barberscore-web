import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  showInactive: false,
  sortProperties: [
    'kindSort:asc',
    'name:asc',
    'status:desc',
  ],
  activeGroups: Ember.computed.filterBy(
    'model.groups',
    'status',
    'isActive',
  ),
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
