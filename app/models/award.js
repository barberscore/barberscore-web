import { computed } from '@ember/object';
import { equal, not, alias } from '@ember/object/computed';
import Model, { attr }  from '@ember-data/model';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  name: attr('string'),
  status: attr('award-status'),
  kind: attr('award-kind'),
  gender: attr('award-gender'),
  level: attr('award-level'),
  season: attr('award-season'),
  isSingle: attr('boolean'),
  threshold: attr('number'),
  minimum: attr('number'),
  advance: attr('number'),
  spots: attr('number'),
  description: attr('string'),
  notes: attr('string'),
  district: attr('award-district'),
  division: attr('award-division'),

  age: attr('award-age'),
  isNovice: attr('boolean'),
  size: attr('award-size'),
  sizeRange: attr(),
  scope: attr('award-scope'),
  scopeRange: attr(),
  treeSort: attr('number'),

  permissions: attr(),

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
