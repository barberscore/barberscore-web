import { not } from '@ember/object/computed';
import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  status: DS.attr('outcome-status'),
  num: DS.attr('number'),
  winner: DS.attr('string'),

  awardId: DS.attr('string'),
  name: DS.attr('string'),
  kind: DS.attr('award-kind'),
  gender: DS.attr('award-gender'),
  level: DS.attr('award-level'),
  season: DS.attr('award-season'),
  description: DS.attr('string'),
  district: DS.attr('award-district'),
  division: DS.attr('award-division'),
  age: DS.attr('award-age'),
  isNovice: DS.attr('boolean'),
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
