import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  status: attr('song-status'),
  round: belongsTo('round', {async: true}),
  performance: belongsTo('performance', {async: true}),
  onstage: attr('date')
});
