import { not } from '@ember/object/computed';
import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  nomen: DS.attr('string'),
  status: DS.attr('entry-status'),
  isArchived: DS.attr('boolean'),
  rank: DS.attr('number'),
  musPoints: DS.attr('number'),
  perPoints: DS.attr('number'),
  sngPoints: DS.attr('number'),
  totPoints: DS.attr('number'),
  musScore: DS.attr('number'),
  perScore: DS.attr('number'),
  sngScore: DS.attr('number'),
  totScore: DS.attr('number'),
  session: DS.belongsTo('session', {async: true}),
  group: DS.belongsTo('group', {async: true}),
  entry: DS.belongsTo('entry', {async: true}),
  appearances: DS.hasMany('appearance', {async: true}),
  grids: DS.hasMany('grid', {async: true}),
  permissions: DS.attr(),
  logs: DS.attr(),

  isDisabled: not(
    'permissions.write'
  ),


});

