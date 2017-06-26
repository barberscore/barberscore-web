import Ember from 'ember';
import Model from 'ember-data/model';
import DS from 'ember-data';
import {memberAction} from 'ember-api-actions';

export default Model.extend({
  nomen: DS.attr('string'),
  status: DS.attr('session-status'),
  kind: DS.attr('session-kind'),
  num_rounds: DS.attr('number'),
  convention: DS.belongsTo('convention', {async: true}),
  contests: DS.hasMany('contest', {async: true}),
  entries: DS.hasMany('entry', {async: true}),
  rounds: DS.hasMany('round', {async: true}),
  permissions: DS.attr(),

  open: memberAction({path: 'open', type: 'post'}),
  close: memberAction({path: 'close', type: 'post'}),
  verify: memberAction({path: 'verify', type: 'post'}),
  start: memberAction({path: 'start', type: 'post'}),
  finish: memberAction({path: 'finish', type: 'post'}),
  draft: memberAction({path: 'draft', type: 'post'}),
  publish: memberAction({path: 'publish', type: 'post'}),
  cursor: DS.belongsTo('appearance', {async: true}),

  conventionStatus: Ember.computed.alias('convention.status'),
  conventionIsActive: Ember.computed.alias('convention.isActive'),
  statusOptions: [
    'New',
    'Scheduled',
    'Opened',
    'Closed',
    'Validated',
    'Started',
    'Finished',
    'Published',
  ],
  kindOptions: [
    'Quartet',
    'Chorus',
    'Very Large Quartet',
    'Mixed Group',
  ],

  numOptions: [
    1,
    2,
    3,
  ],

  mtEntries: Ember.computed.filterBy(
    'entries',
    'is_mt'
  ),
  mtCount: Ember.computed.alias('mtEntries.length'),
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
  acceptedEntries: Ember.computed.filterBy(
    'entries',
    'status',
    'Accepted'
  ),

  scratchedEntries: Ember.computed.filterBy(
    'entries',
    'status',
    'Scratched'
  ),

  newEntriesCount: Ember.computed.alias('newEntries.length'),
  invitedEntriesCount: Ember.computed.alias('invitedEntries.length'),
  submittedEntriesCount: Ember.computed.alias('submittedEntries.length'),
  acceptedEntriesCount: Ember.computed.alias('acceptedEntries.length'),
  scratchedEntriesCount: Ember.computed.alias('scratchedEntries.length'),
  totalEntriesCount: Ember.computed.alias('entries.length'),

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
});
