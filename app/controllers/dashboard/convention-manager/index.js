import { computed } from '@ember/object';
import { filterBy, uniq, sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  currentUser: service(),
  sortedConventionsProperties: [
    'startDate:asc',
    'endDate:asc',
  ],
  filteredConventions: filterBy(
    'model',
    'isActive'
  ),
  uniqueConventions: uniq(
    'filteredConventions',
  ),
  sortedConventions: sort(
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

  organizationCall: computed(function() {
    return this.get('store').query('organization', {
      'status': 10, //TODO Hardcoded
    });
  }),
  organizationOptionsProperties: [
    'kindSort:asc',
    'name:asc',
  ],
  organizationOptions: sort(
    'organizationCall',
    'organizationOptionsProperties'
  ),

  actions: {
    sortBy(sortProperties) {
      this.set('sortProperties', [sortProperties]);
    },
    createConvention() {
      this.transitionToRoute('dashboard.convention-manager.new');
    },
  },
});
