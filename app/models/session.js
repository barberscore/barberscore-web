import {
  alias,
  equal,
  not,
  filterBy,
  sort,
  mapBy
} from '@ember/object/computed';
import { computed } from '@ember/object';
import Model from 'ember-data/model';
import DS from 'ember-data';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  nomen: DS.attr('string'),
  status: DS.attr('session-status'),
  kind: DS.attr('session-kind'),
  isInvitational: DS.attr('boolean'),
  scoresheet: DS.attr('string'),
  bbscores: DS.attr('string'),
  drcjReport: DS.attr('string'),
  adminEmails: DS.attr('string'),
  numRounds: DS.attr('number'),
  convention: DS.belongsTo('convention', {async: true}),
  contests: DS.hasMany('contest', {async: true}),
  entries: DS.hasMany('entry', {async: true}),
  rounds: DS.hasMany('round', {async: true}),
  grantors: DS.hasMany('grantor', {async: true}),
  permissions: DS.attr(),

  publish: memberAction({path: 'publish', type: 'post'}),
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

  isArchived: equal('status', 'Archived'),
  isCurrent: not('isArchived'),

  organizationKindSort: alias('convention.organizationKindSort'),
  organizationNomen: alias('convention.organizationNomen'),

  statusOptions: [
    'New',
    'Opened',
    'Restricted',
    'Closed',
    'Verified',
    'Started',
    'Finished',
    'Announced',
    'Archived',
  ],
  kindOptions: [
    'Quartet',
    'Chorus',
  ],

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

  scratchedEntries: filterBy(
    'entries',
    'status',
    'Scratched'
  ),

  newEntriesCount: alias('newEntries.length'),
  invitedEntriesCount: alias('invitedEntries.length'),
  withdrawnEntriesCount: alias('withdrawnEntries.length'),
  submittedEntriesCount: alias('submittedEntries.length'),
  approvedEntriesCount: alias('approvedEntries.length'),
  scratchedEntriesCount: alias('scratchedEntries.length'),
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

  ranks: computed('entries.@each.totPoints', function() {
    let lastScore = null;
    let lastRank = null;
    return this.get('entries').sortBy('totPoints').reverse().map((competitor, index) => {
       let score = competitor.get('totPoints');
       let rank = score === lastScore ? lastRank : index+1;
       lastScore = score;
       lastRank = rank;
       return {
           score: score,
           rank: rank
       };
    });
  }),
  currentAppearancesSort: [
    'num',
  ],
  currentAppearances: sort(
    'current.appearances',
    'currentAppearancesSort'
  ),
  conventionName: computed(
    'convention.name',
    function() {
      return this.get('convention.name');
    }
  ),
  awardsArray: computed(
    'contests.@each.award', function() {
      return this.get('contests');
  }),
  selectedAwards: mapBy(
    'awardsArray',
    'award.id'
  ),
});
