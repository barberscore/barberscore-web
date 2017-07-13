import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  sortProperties: [
    'isPrimary:desc',
    'name:asc',
    'kindOptions',
  ],
  activeAwards: Ember.computed.filterBy(
    'model.awards',
    'status',
    'Active'
  ),
  sortedItems: Ember.computed.sort(
    'activeAwards',
    'sortProperties'
  ),
  actions: {
    createAward() {
      this.get('store').createRecord('award', {
        name: this.get('name')
      });
    }
  }
});
