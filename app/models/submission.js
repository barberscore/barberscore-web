import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  status: attr('submission-status'),
  performer: belongsTo('performer', {async: true}),
  chart: belongsTo('chart', {async: true}),
  songs: hasMany('songs', {async: true}),
});
