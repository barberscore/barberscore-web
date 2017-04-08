import Ember from 'ember';

export default Ember.Controller.extend({
  isRaw: false,
  entrySortProperties: [
    'entryscore.total_points:desc',
    'entryscore.sng_points:desc',
    'entryscore.mus_points:desc',
    'entryscore.prs_points:desc',
  ],
  sortedEntries: Ember.computed.sort(
    'model.entries',
    'entrySortProperties'
  ),
  contestSortProperties: [
    'entityKindSort',
    'awardQualifier',
    'awardPrimary:desc',
    'awardAgeSort',
    'awardName',
  ],
  championshipContests: Ember.computed.filterBy(
    'model.contests',
    'is_qualifier',
    false
  ),
  sortedContests: Ember.computed.sort(
    'championshipContests',
    'contestSortProperties'
  ),
  actions: {
    letsGo() {
      this.toggleProperty('isRaw');
    },
  },
});
