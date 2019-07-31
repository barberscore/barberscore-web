import { alias, filterBy } from '@ember/object/computed';

import Component from '@ember/component';

export default Component.extend({
  newEntries: filterBy(
    'model.entries',
    'status',
    'New'
  ),
  builtEntries: filterBy(
    'model.entries',
    'status',
    'Built'
  ),
  invitedEntries: filterBy(
    'model.entries',
    'status',
    'Invited'
  ),
  withdrawnEntries: filterBy(
    'model.entries',
    'status',
    'Withdrawn'
  ),
  submittedEntries: filterBy(
    'model.entries',
    'status',
    'Submitted'
  ),
  approvedEntries: filterBy(
    'model.entries',
    'status',
    'Approved'
  ),

  newEntriesCount: alias('newEntries.length'),
  builtEntriesCount: alias('builtEntries.length'),
  invitedEntriesCount: alias('invitedEntries.length'),
  withdrawnEntriesCount: alias('withdrawnEntries.length'),
  submittedEntriesCount: alias('submittedEntries.length'),
  approvedEntriesCount: alias('approvedEntries.length'),
  totalEntriesCount: alias('model.entries.length'),
  contestCount: alias('model.contests.length'),
});
