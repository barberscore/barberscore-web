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
  rounds: DS.attr('number'),
  threshold: DS.attr('number'),
  minimum: DS.attr('number'),
  advance: DS.attr('number'),
  spots: DS.attr('number'),
  description: DS.attr('string'),
  divizion: DS.attr('award-division'),
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
      return this.statusOptions.indexOf(this.status);
    }
  ),
  kindSort: computed(
    'kind',
    'kindOptions',
    function() {
      return this.kindOptions.indexOf(this.kind);
    }
  ),
  levelSort: computed(
    'level',
    'levelOptions',
    function() {
      return this.levelOptions.indexOf(this.level);
    }
  ),
  seasonSort: computed(
    'season',
    'seasonOptions',
    function() {
      return this.seasonOptions.indexOf(this.season);
    }
  ),
  ageSort: computed(
    'age',
    'ageOptions',
    function() {
      return this.ageOptions.indexOf(this.age);
    }
  ),
});
