import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo, hasMany } from 'ember-data/relationships';
import {memberAction} from 'ember-api-actions';

export default Model.extend({
  nomen: attr('string'),
  status: attr('session-status'),
  kind: attr('session-kind'),
  age: attr('session-age'),
  num_rounds: attr('number'),
  is_prelims: attr('boolean'),
  // current: belongsTo('round', {async: true, inverse: 'current_session'}),
  primary: belongsTo('contest', {async: true, inverse: 'primary_contest'}),
  convention: belongsTo('convention', {async: true}),
  rounds: hasMany('round', {async: true}),
  entries: hasMany('entry', {async: true}),
  contests: hasMany('contest', {async: true}),
  open: memberAction({path: 'open', type: 'post'}),
  close: memberAction({path: 'close', type: 'post'}),
  validate: memberAction({path: 'validate', type: 'post'}),
  start: memberAction({path: 'start', type: 'post'}),
  finish: memberAction({path: 'finish', type: 'post'}),
  draft: memberAction({path: 'draft', type: 'post'}),
  publish: memberAction({path: 'publish', type: 'post'}),
  cursor: belongsTo('appearance', {async: true}),
  permissions: attr(),

  statusOptions: [
    'New',
    'Listed',
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
