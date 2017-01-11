import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: [
    "page",
    "per",
  ],
  // page: Ember.computed.alias("content.page"),
  // per: Ember.computed.alias("content.per"),
  // pages: Ember.computed.alias("content.pages"),
  // page: 1,
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
