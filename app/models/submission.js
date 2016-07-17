import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  status: attr('submission-status'),
  title: attr('string'),
  arranger: attr('string'),
  source: attr('string'),
  is_medley: attr('boolean'),
  is_parody: attr('boolean'),
  performer: belongsTo('performer', {async: true}),
  songs: hasMany('songs', {async: true}),
});
