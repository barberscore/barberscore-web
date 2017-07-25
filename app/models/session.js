import Ember from 'ember';
import Model from 'ember-data/model';
import DS from 'ember-data';
import {memberAction} from 'ember-api-actions';
const {computed} = Ember;

export default Model.extend({
  nomen: DS.attr('string'),
  status: DS.attr('session-status'),
  kind: DS.attr('session-kind'),
  scoresheet: DS.attr('string'),
  bbscores: DS.attr('string'),
  numRounds: DS.attr('number'),
  convention: DS.belongsTo('convention', {async: true}),
  contests: DS.hasMany('contest', {async: true}),
  entries: DS.hasMany('entry', {async: true}),
  rounds: DS.hasMany('round', {async: true}),
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

  conventionStatus: Ember.computed.alias('convention.status'),
  conventionIsActive: Ember.computed.alias('convention.isActive'),
  statusOptions: [
    'New',
    'Published',
    'Opened',
    'Closed',
    'Validated',
    'Started',
    'Finished',
    'Announced',
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

  newEntries: Ember.computed.filterBy(
    'entries',
    'status',
    'New'
  ),
  invitedEntries: Ember.computed.filterBy(
    'entries',
    'status',
    'Invited'
  ),
  submittedEntries: Ember.computed.filterBy(
    'entries',
    'status',
    'Submitted'
  ),
  approvedEntries: Ember.computed.filterBy(
    'entries',
    'status',
    'Approved'
  ),

  scratchedEntries: Ember.computed.filterBy(
    'entries',
    'status',
    'Scratched'
  ),

  newEntriesCount: Ember.computed.alias('newEntries.length'),
  invitedEntriesCount: Ember.computed.alias('invitedEntries.length'),
  submittedEntriesCount: Ember.computed.alias('submittedEntries.length'),
  approvedEntriesCount: Ember.computed.alias('approvedEntries.length'),
  scratchedEntriesCount: Ember.computed.alias('scratchedEntries.length'),
  totalEntriesCount: Ember.computed.alias('entries.length'),
  contestCount: computed.alias('contests.length'),

  kindSort: Ember.computed(
    'kind',
    'kindOptions',
    function() {
      return this.get('kindOptions').indexOf(this.get('kind'));
    }
  ),

  ranks: Ember.computed('entries.@each.totPoints', function() {
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
  currentAppearances: Ember.computed.sort(
    'current.appearances',
    'currentAppearancesSort'
  ),
  conventionName: Ember.computed(
    'convention.name',
    function() {
      return this.get('convention.name');
    }
  ),
  awardsArray: computed(
    'contests.@each.award', function() {
      return this.get('contests');
  }),
  selectedAwards: computed.mapBy(
    'awardsArray',
    'award.id'
  ),
});
