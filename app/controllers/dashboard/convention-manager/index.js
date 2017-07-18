import Ember from 'ember';

export default Ember.Controller.extend({
  currentUser: Ember.inject.service(),
  uniques: Ember.computed.uniq(
    'model'
  ),
  openModal: false,
  sortProperties: [
    'startDate:asc',
    'endDate:asc',
  ],
  filteredConventions: Ember.computed.filterBy(
    'model',
    'isActive'
  ),
  sortedConventions: Ember.computed.sort(
    'filteredConventions',
    'sortProperties'
  ),
  kindOptions: [
    'International',
    'District',
    'Division',
    'District and Division',
  ],
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
    'Quintiple',
  ],

  organizationCall: Ember.computed(function() {
    return this.get('store').query('organization', {
      'kind__lt': 20, //TODO Hardcoded
      'page_size': 100,
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
  riserOptions: [
    0,3,4,5,6,7,8,9,10,11,12,13
  ],
  location: '',

  actions: {
    sortBy(sortProperties) {
      this.set('sortProperties', [sortProperties]);
    },
  },
});
