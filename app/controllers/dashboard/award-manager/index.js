import Ember from 'ember';

export default Ember.Controller.extend({
    currentUser: Ember.inject.service('current-user'),
    sortProperties: [
        'organizationKindSort:asc',
        'level',
        'name',
    ],
    uniqueItems: Ember.computed.uniq(
        'model',
    ),
    sortedItems: Ember.computed.sort(
        'uniqueItems',
        'sortProperties'
    ),
    actions: {
        createAward() {
          this.transitionToRoute('dashboard.award-manager.new');
        },
        sortBy(sortProperties) {
          this.set('sortProperties', [sortProperties]);
        },
    },
});
