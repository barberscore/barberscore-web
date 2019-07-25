import Component from '@ember/component';
import { sort } from '@ember/object/computed';

export default Component.extend({
  sortedEntriesProperties: [
    'groupName:asc',
  ],
  sortedEntries: sort(
    'model.entries',
    'sortedEntriesProperties'
  ),
  sortedContestsProperties: [
    'isPrimary:desc',
    'groupKindSort',
    'awardQualifier',
    'awardAgeSort',
    'awardName',
  ],
  sortedContests: sort(
    'model.session.contests',
    'sortedContestsProperties'
  ),
});
