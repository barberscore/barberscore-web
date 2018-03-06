import { alias, not, filterBy, sort } from '@ember/object/computed';
import { computed } from '@ember/object';
import Model from 'ember-data/model';
import DS from 'ember-data';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  nomen: DS.attr('string'),
  status: DS.attr('session-status'),
  isArchived: DS.attr('boolean'),
  kind: DS.attr('session-kind'),
  gender: DS.attr('session-gender'),
  isInvitational: DS.attr('boolean'),
  description: DS.attr('string'),
  notes: DS.attr('string'),
  bbscoresReportNew: DS.attr('string'),
  drcjReportNew: DS.attr('string'),
  adminsReportNew: DS.attr('string'),
  activesReportNew: DS.attr('string'),
  numRounds: DS.attr('number'),
  convention: DS.belongsTo('convention', {async: true}),
  contests: DS.hasMany('contest', {async: true}),
  entries: DS.hasMany('entry', {async: true}),
  competitors: DS.hasMany('competitor', {async: true}),
  rounds: DS.hasMany('round', {async: true}),
  grantors: DS.hasMany('grantor', {async: true}),
  permissions: DS.attr(),

  publish: memberAction({path: 'publish', type: 'post'}),
  build: memberAction({path: 'build', type: 'post'}),
  open: memberAction({path: 'open', type: 'post'}),
  close: memberAction({path: 'close', type: 'post'}),
  verify: memberAction({path: 'verify', type: 'post'}),
  start: memberAction({path: 'start', type: 'post'}),
  finish: memberAction({path: 'finish', type: 'post'}),
  draft: memberAction({path: 'draft', type: 'post'}),
  announce: memberAction({path: 'announce', type: 'post'}),
  cursor: DS.belongsTo('appearance', {async: true}),

  conventionStatus: alias('convention.status'),
  conventionIsActive: alias('convention.isActive'),

  notArchived: not('isArchived'),

  groupKindSort: alias('convention.groupKindSort'),
  groupNomen: alias('convention.groupNomen'),

  statusOptions: [
    'New',
    'Opened',
    'Closed',
    'Verified',
    'Started',
    'Finished',
  ],
  kindOptions: [
    'Quartet',
    'Chorus',
  ],

  genderOptions: [
    'Male',
    'Female',
    'Mixed',
  ],

  genderSort: computed(
    'gender',
    'genderOptions',
    function() {
      return this.get('genderOptions').indexOf(this.get('gender'));
    }
  ),
  numOptions: [
    1,
    2,
    3,
  ],

  newEntries: filterBy(
    'entries',
    'status',
    'New'
  ),
  builtEntries: filterBy(
    'entries',
    'status',
    'Built'
  ),
  invitedEntries: filterBy(
    'entries',
    'status',
    'Invited'
  ),
  withdrawnEntries: filterBy(
    'entries',
    'status',
    'Withdrawn'
  ),
  submittedEntries: filterBy(
    'entries',
    'status',
    'Submitted'
  ),
  approvedEntries: filterBy(
    'entries',
    'status',
    'Approved'
  ),

  newEntriesCount: alias('newEntries.length'),
  builtEntriesCount: alias('builtEntries.length'),
  invitedEntriesCount: alias('invitedEntries.length'),
  withdrawnEntriesCount: alias('withdrawnEntries.length'),
  submittedEntriesCount: alias('submittedEntries.length'),
  approvedEntriesCount: alias('approvedEntries.length'),
  totalEntriesCount: alias('entries.length'),
  contestCount: alias('contests.length'),

  statusSort: computed(
    'status',
    'statusOptions',
    function() {
      return this.get('statusOptions').indexOf(this.get('status'));
    }
  ),

  kindSort: computed(
    'kind',
    'kindOptions',
    function() {
      return this.get('kindOptions').indexOf(this.get('kind'));
    }
  ),

  currentAppearancesSort: [
    'num',
  ],
  currentAppearances: sort(
    'current.appearances',
    'currentAppearancesSort'
  ),
  conventionName: alias('convention.name'),
});
