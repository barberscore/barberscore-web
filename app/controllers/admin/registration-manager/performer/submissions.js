import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: [
    'status',
  ],
  sortedItems: Ember.computed.sort(
    'model.submissions',
    'sortProperties'
  ),
  actions: {
    sortBy(sortProperties) {
      this.set('sortProperties', [sortProperties]);
    },
  }
});
