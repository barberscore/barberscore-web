import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  contestSortProperties: [
    'organizationKindSort',
    'awardQualifier',
    'awardPrimary:desc',
    'awardAgeSort',
    'awardName',
  ],
  sortedContests: Ember.computed.sort(
    'model.contests',
    'contestSortProperties'
  ),
  awardSortProperties: [
    'organizationKindSort',
    'isQualifier',
    'isPrimary:desc',
    'ageSort',
    'name',
  ],
  districtAwards: Ember.computed.alias('model.convention.organization.awards'),
  divisionAwards: Ember.computed(
    'model.convention.organization',
    function() {
      return this.get('store').query('award', {
        'organization__parent': this.get('model.convention.organization.id'),
      });
    }
  ),
  unionedAwards: Ember.computed.union(
    'districtAwards',
    'divisionAwards',
  ),
  filteredAwards: Ember.computed(
    'unionedAwards.@each.{kind,season}',
    'model.kind',
    'model.convention.season',
    function() {
      return this.get('unionedAwards').filterBy('kind', this.get('model.kind')).filterBy('season', this.get('model.convention.season'));
    }
  ),
  sortedAwards: Ember.computed.sort(
    'filteredAwards',
    'awardSortProperties',
  ),
  actions: {
    sortBy(contestSortProperties) {
      this.set('contestSortProperties', [contestSortProperties]);
    },
    sortByAward(awardSortProperties) {
      this.set('awardSortProperties', [awardSortProperties]);
    },
  }
});
