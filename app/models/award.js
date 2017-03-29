import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  nomen: attr('string'),
  name: attr('string'),
  status: attr('award-status'),
  kind: attr('award-kind'),
  age: attr('award-age'),
  season: attr('award-season'),
  rounds: attr('number'),
  is_qualifier: attr('boolean'),
  is_primary: attr('boolean'),
  is_improved: attr('boolean'),
  is_novice: attr('boolean'),
  is_manual: attr('boolean'),
  threshold: attr('number'),
  minimum: attr('number'),
  advance: attr('number'),
  size: attr('award-size'),
  scope: attr('award-scope'),
  idiom: attr('string'),
  entity: belongsTo('entity', {async: true}),
  contests: hasMany('contest', {inverse:'award', async: true}),
  permissions: attr(),

  statusOptions: [
    'New',
    'Active',
    'Inactive',
  ],
  kindOptions: [
    'Quartet',
    'Chorus',
    'Seniors',
    'Collegiate',
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

  kindSort: Ember.computed(
    'entity.kindSort',
    function() {
      return this.get('entity.kindSort');
    }
  ),
});
