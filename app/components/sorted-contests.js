import Ember from 'ember';

export default Ember.Component.extend({
  sortedContestsProperties: [
    'organizationKindSort',
    'awardQualifier',
    'awardPrimary:desc',
    'awardAgeSort',
    'awardName',
  ],
  sortedContests: Ember.computed.sort(
    'session.contests',
    'sortedContestsProperties'
  ),
});
