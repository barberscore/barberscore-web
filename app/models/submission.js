import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  nomen: attr('string'),
  status: attr('submission-status'),
  title: attr('string'),
  bhs_catalog: attr('number'),
  arrangers: attr('string'),
  composers: attr('string'),
  holders: attr('string'),
  is_medley: attr('boolean'),
  is_parody: attr('boolean'),
  performer: belongsTo('performer', {async: true}),
  songs: hasMany('songs', {async: true}),
  permissions: attr(),

  statusOptions: [
    'New',
    'Pre-Submitted',
    'Post-Submitted',
    'Validated',
  ],

});
