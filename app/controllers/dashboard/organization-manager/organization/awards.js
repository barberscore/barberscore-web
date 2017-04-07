import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  flashMessage: Ember.get(this, 'flashMessages'),
  sortProperties: [
    'is_primary:desc',
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
