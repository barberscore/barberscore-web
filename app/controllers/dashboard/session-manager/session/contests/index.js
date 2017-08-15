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
  rawAwards: Ember.computed(
    'model',
    function() {
      return this.get('store').query('award', {
        'organization__grantors__session': this.get('model.id'),
        'page_size': 100,
      });
    }
  ),
  filteredAwards: Ember.computed(
    'rawAwards.@each.{kind,season}',
    'model.kind',
    'model.convention.season',
    function() {
      return this.get('rawAwards').filterBy('kind', this.get('model.kind')).filterBy('season', this.get('model.convention.season'));
    }
  ),
  uniqueAwards: Ember.computed.uniq(
    'filteredAwards',
  ),
  sortedAwards: Ember.computed.sort(
    'uniqueAwards',
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
