import Ember from 'ember';

export default Ember.Controller.extend({
  uniques: Ember.computed.uniq(
    'model'
  ),
  sortProperties: [
    'start_date:asc',
    'end_date:asc',
  ],
  sortedConventions: Ember.computed.sort(
    'uniques',
    'sortProperties'
  ),
  actions: {
    sortBy(sortProperties) {
      this.set('sortProperties', [sortProperties]);
    },
  }
});
