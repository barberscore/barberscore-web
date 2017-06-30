import Ember from 'ember';
import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  nomen: DS.attr('string'),
  name: DS.attr('string'),
  status: DS.attr('award-status'),
  kind: DS.attr('award-kind'),
  age: DS.attr('award-age'),
  season: DS.attr('award-season'),
  size: DS.attr('award-size'),
  scope: DS.attr('award-scope'),
  is_qualifier: DS.attr('boolean'),
  is_primary: DS.attr('boolean'),
  is_improved: DS.attr('boolean'),
  is_novice: DS.attr('boolean'),
  is_manual: DS.attr('boolean'),
  is_multi: DS.attr('boolean'),
  is_district_representatives: DS.attr('boolean'),
  rounds: DS.attr('number'),
  threshold: DS.attr('number'),
  minimum: DS.attr('number'),
  advance: DS.attr('number'),
  entity: DS.belongsTo('entity', {async: true}),
  parent: DS.belongsTo('award', {inverse:'children', async: true}),
  children: DS.hasMany('award', {inverse:'parent', async: true}),
  contests: DS.hasMany('contest', {inverse:'award', async: true}),
  permissions: DS.attr(),

  statusOptions: [
    'New',
    'Active',
    'Inactive',
  ],
  kindOptions: [
    'Quartet',
    'Chorus',
    'Mixed Group',
    'Very Large Quartet',
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

  entityKindSort: Ember.computed.alias('entity.kindSort'),
  kindSort: Ember.computed(
    'kind',
    'kindOptions',
    function() {
      return this.get('kindOptions').indexOf(this.get('kind'));
    }
  ),
  ageSort: Ember.computed(
    'age',
    'ageOptions',
    function() {
      return this.get('ageOptions').indexOf(this.get('age'));
    }
  ),
});
