import Ember from 'ember';

export default Ember.Controller.extend({
  collapseChorus: false,
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
