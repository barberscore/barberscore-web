import { sort } from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
  sortedContestsProperties: [
    'organizationKindSort',
    'awardQualifier',
    'awardPrimary:desc',
    'awardAgeSort',
    'awardName',
  ],
  sortedContests: sort(
    'session.contests',
    'sortedContestsProperties'
  ),
});
