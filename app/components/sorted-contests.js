import Ember from 'ember';

export default Ember.Component.extend({
  sortedContestsProperties: [
    'entityKindSort',
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
