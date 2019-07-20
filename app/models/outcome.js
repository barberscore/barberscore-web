import { not } from '@ember/object/computed';
import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  status: DS.attr('outcome-status'),
  num: DS.attr('number'),
  name: DS.attr('string'),

  round: DS.belongsTo('round', {async: true}),
  awardId: DS.belongsTo('award', {async: true}),

  contenders: DS.hasMany('contender', {async: true}),
  permissions: DS.attr(),

  isDisabled: not(
    'permissions.write'
  ),

});
