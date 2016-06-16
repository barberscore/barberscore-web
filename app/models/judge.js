import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  status: attr('judge-status'),
  category: attr('judge-category'),
  designation: attr('string'),
  kind: attr('judge-kind'),
  slot: attr('number'),
  session: belongsTo('session', {async: true}),
  certification: belongsTo('certification', {async: true}),
  scores: hasMany('score', {async: true}),
});
