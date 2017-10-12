import { computed } from '@ember/object';
import { sort, uniq } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  store: service(),
  contestSortProperties: [
    'organizationKindSort',
    'awardQualifier',
    'awardPrimary:desc',
    'awardAgeSort',
    'awardName',
  ],
  sortedContests: sort(
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
  rawAwards: computed(
    'model',
    function() {
      return this.get('store').query('award', {
        'organization__grantors__session': this.get('model.id'),
        'page_size': 100,
      });
    }
  ),
  filteredAwards: computed(
    'rawAwards.@each.{kind,season}',
    'model.kind',
    'model.convention.season',
    function() {
      return this.get('rawAwards').filterBy('kind', this.get('model.kind')).filterBy('season', this.get('model.convention.season'));
    }
  ),
  uniqueAwards: uniq(
    'filteredAwards',
  ),
  sortedAwards: sort(
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
