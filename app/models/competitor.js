import { not } from '@ember/object/computed';
import Model from 'ember-data/model';
import DS from 'ember-data';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  status: DS.attr('competitor-status'),
  draw: DS.attr('number'),
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

  start: memberAction({path: 'start', type: 'post'}),
  finish: memberAction({path: 'finish', type: 'post'}),
  disqualify: memberAction({path: 'disqualify', type: 'post'}),
  scratch: memberAction({path: 'scratch', type: 'post'}),

  isDisabled: not(
    'permissions.write'
  ),


});

