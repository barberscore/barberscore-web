import { computed } from '@ember/object';
import { equal, alias } from '@ember/object/computed';
import Model from 'ember-data/model';
import DS from 'ember-data';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  nomen: DS.attr('string'),
  name: DS.attr('string'),
  status: DS.attr('award-status'),
  kind: DS.attr('award-kind'),
  level: DS.attr('award-level'),
  age: DS.attr('award-age'),
  season: DS.attr('award-season'),
  size: DS.attr('award-size'),
  scope: DS.attr('award-scope'),
  isQualifier: DS.attr('boolean'),
  isPrimary: DS.attr('boolean'),
  isImproved: DS.attr('boolean'),
  isNovice: DS.attr('boolean'),
  isManual: DS.attr('boolean'),
  isMulti: DS.attr('boolean'),
  isRepQualifies: DS.attr('boolean'),
  rounds: DS.attr('number'),
  threshold: DS.attr('number'),
  minimum: DS.attr('number'),
  advance: DS.attr('number'),
  organization: DS.belongsTo('organization', {async: true}),
  contests: DS.hasMany('contest', {async: true}),
  parent: DS.belongsTo('award', {inverse:'children', async: true}),
  children: DS.hasMany('award', {inverse:'parent', async: true}),
  permissions: DS.attr(),

  // Transitions
  activate: memberAction({path: 'activate', type: 'post'}),
  deactivate: memberAction({path: 'deactivate', type: 'post'}),


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
    'Collegiate',
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

  organizationParent: alias('organization.parent'),
  organizationKindSort: alias('organization.kindSort'),
  organizationNameSort: alias('organization.shortName'),
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
