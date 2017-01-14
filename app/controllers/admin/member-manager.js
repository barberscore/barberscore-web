import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: [
    "page",
    "perPage",
  ],
  page: Ember.computed.alias("content.page"),
  perPage: Ember.computed.alias("content.perPage"),
  totalPages: Ember.computed.alias("content.totalPages"),
  page: 1,
  perPage: 10,
  personSortProperties: [
    'nomen:asc',
  ],
  sortedPersons: Ember.computed.sort(
    'model',
    'personSortProperties'
  ),
  actions: {
    collapseHeader() {
      this.toggleProperty('collapseChorus');
    },
    sortBy(personSortProperties) {
      this.set('personSortProperties', [personSortProperties]);
    },
  }
});
