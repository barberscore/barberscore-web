import { computed } from '@ember/object';
import { equal, not, alias } from '@ember/object/computed';
import Model from 'ember-data/model';
import DS from 'ember-data';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  name: DS.attr('string'),
  status: DS.attr('award-status'),
  kind: DS.attr('award-kind'),
  gender: DS.attr('award-gender'),
  level: DS.attr('award-level'),
  season: DS.attr('award-season'),
  isPrimary: DS.attr('boolean'),
  isInvitational: DS.attr('boolean'),
  isManual: DS.attr('boolean'),
  rounds: DS.attr('number'),
  threshold: DS.attr('number'),
  minimum: DS.attr('number'),
  advance: DS.attr('number'),
  footnote: DS.attr('string'),
  description: DS.attr('string'),
  isImproved: DS.attr('boolean'),
  isMulti: DS.attr('boolean'),
  isRepQualifies: DS.attr('boolean'),
  age: DS.attr('award-age'),
  size: DS.attr('award-size'),
  scope: DS.attr('award-scope'),
  treeSort: DS.attr('number'),
  group: DS.belongsTo('group', {async: true}),
  parent: DS.belongsTo('award', {inverse:'children', async: true}),
  children: DS.hasMany('award', {inverse:'parent', async: true}),
  contests: DS.hasMany('contest', {async: true}),
  permissions: DS.attr(),

  // Transitions
  activate: memberAction({path: 'activate', type: 'post'}),
  deactivate: memberAction({path: 'deactivate', type: 'post'}),

  isDisabled: not(
    'permissions.write'
  ),


  statusOptions: [
    'New',
    'Active',
    'Inactive',
  ],
  kindOptions: [
    'Quartet',
    'Chorus',
  ],

  levelOptions: [
    'Championship',
    'Award',
    'Qualifier',
  ],

  ageOptions: [
    'Seniors',
    'Youth',
  ],

  seasonOptions: [
    'Summer',
    'Midwinter',
    'Fall',
    'Spring',
    'Video',
  ],
  sizeOptions: [
    'Plateau 1',
  ],
  scopeOptions: [
    'Plateau 1',
  ],

  roundOptions: [
    1,
    2,
    3,
  ],

  isChampionship: equal(
    'level',
    'Championship',
  ),

  groupParent: alias('group.parent'),
  groupKindSort: alias('group.kindSort'),
  groupNameSort: alias('group.name'),
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
  levelSort: computed(
    'level',
    'levelOptions',
    function() {
      return this.get('levelOptions').indexOf(this.get('level'));
    }
  ),
  seasonSort: computed(
    'season',
    'seasonOptions',
    function() {
      return this.get('seasonOptions').indexOf(this.get('season'));
    }
  ),
  ageSort: computed(
    'age',
    'ageOptions',
    function() {
      return this.get('ageOptions').indexOf(this.get('age'));
    }
  ),
});
