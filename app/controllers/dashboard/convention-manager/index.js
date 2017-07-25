import Ember from 'ember';

export default Ember.Controller.extend({
  currentUser: Ember.inject.service(),
  sortedConventionsProperties: [
    'startDate:asc',
    'endDate:asc',
  ],
  filteredConventions: Ember.computed.filterBy(
    'model',
    'isActive'
  ),
  uniqueConventions: Ember.computed.uniq(
    'filteredConventions',
  ),
  sortedConventions: Ember.computed.sort(
    'uniqueConventions',
    'sortedConventionsProperties'
  ),
  seasonOptions: [
    'Summer',
    'Midwinter',
    'Fall',
    'Spring',
    'Video',
  ],
  panelOptions: [
    'Single',
    'Double',
    'Triple',
    'Quadruple',
    'Quintuple',
  ],

  organizationCall: Ember.computed(function() {
    return this.get('store').query('organization', {
      'status': 10, //TODO Hardcoded
    });
  }),
  organizationOptionsProperties: [
    'kindSort:asc',
    'name:asc',
  ],
  organizationOptions: Ember.computed.sort(
    'organizationCall',
    'organizationOptionsProperties'
  ),

  actions: {
    sortBy(sortProperties) {
      this.set('sortProperties', [sortProperties]);
    },
  },
});
