import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  nomen: attr('string'),
  name: attr('string'),
  status: attr('award-status'),
  kind: attr('award-kind'),
  season: attr('award-season'),
  size: attr('award-size'),
  scope: attr('award-scope'),
  championship_rounds: attr('number'),
  is_primary: attr('boolean'),
  is_improved: attr('boolean'),
  is_novice: attr('boolean'),
  idiom: attr('string'),
  threshold: attr('number'),
  level: attr('award-level'),
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

});
