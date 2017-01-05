import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo, hasMany} from 'ember-data/relationships';

export default Model.extend({
  nomen: attr('string'),
  status: attr('song-status'),
  round: belongsTo('round', {async: true}),
  performances: hasMany('performance', {async: true}),
  num: attr('number'),
  onstage: attr('date'),
  permissions: attr(),
});
