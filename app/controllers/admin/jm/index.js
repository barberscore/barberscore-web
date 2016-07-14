import Ember from 'ember';

export default Ember.Controller.extend({
  collapseChorus: false,
  certificationSortProperties: [
    'person.name:asc',
  ],
  sortedCertifications: Ember.computed.sort(
    'model',
    'certificationSortProperties'
  ),
  actions: {
    collapseHeader() {
      this.toggleProperty('collapseChorus');
    },
    sortBy(certificationSortProperties) {
      this.set('certificationSortProperties', [certificationSortProperties]);
    },
  }
});
