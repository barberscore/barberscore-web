import { not } from '@ember/object/computed';
import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  status: DS.attr('outcome-status'),
  num: DS.attr('number'),
  winner: DS.attr('string'),

  awardId: DS.attr('string'),
  name: DS.attr('string'),
  kind: DS.attr('string'),
  gender: DS.attr('string'),
  level: DS.attr('string'),
  season: DS.attr('string'),
  description: DS.attr('string'),
  district: DS.attr('string'),
  division: DS.attr('string'),
  age: DS.attr('string'),
  is_novice: DS.attr('string'),
  size: DS.attr('string'),
  sizeRange: DS.attr('string'),
  scope: DS.attr('string'),
  scopeRange: DS.attr('string'),
  treeSort: DS.attr('string'),

  round: DS.belongsTo('round', {async: true}),
  appearances: DS.hasMany('appearance', {async: true}),
  permissions: DS.attr(),

  isDisabled: not(
    'permissions.write'
  ),

});
