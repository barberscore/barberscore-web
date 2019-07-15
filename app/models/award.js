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
  isSingle: DS.attr('boolean'),
  threshold: DS.attr('number'),
  minimum: DS.attr('number'),
  advance: DS.attr('number'),
  spots: DS.attr('number'),
  description: DS.attr('string'),
  notes: DS.attr('string'),
  district: DS.attr('string'),
  division: DS.attr('award-division'),


  age: DS.attr('award-age'),
  isNovice: DS.attr('boolean'),
  size: DS.attr('award-size'),
  sizeRange: DS.attr(),
  scope: DS.attr('award-scope'),
  scopeRange: DS.attr(),

  treeSort: DS.attr('number'),
  groupId: DS.attr('string'),
  group: computed(
    'groupId',
    function() {
      return this.store.findRecord('group', this.groupId);
    }
  ),

  parent: DS.belongsTo('award', {inverse:'children', async: true}),
  permissions: DS.attr(),

  contests: DS.hasMany('contest', {async: true}),
  outcomes: DS.hasMany('outcome', {async: true}),

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

  generOptions: [
    'Male',
    'Female',
    'Mixed',
  ],

  levelOptions: [
    'Championship',
    'Qualifier',
    'Representative',
    'Deferred',
    'Manual',
    'Improved - Raw',
    'Improved - Standard',
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
