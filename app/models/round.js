import DS from 'ember-data';
import {memberAction} from 'ember-api-actions';

export default DS.Model.extend({
  name: DS.attr('string'),
  status: DS.attr('round-status'),
  kind: DS.attr('round-kind'),
  date: DS.attr('date-range'),
  num: DS.attr('number'),
  mt: DS.belongsTo('group', {async: true}),
  session: DS.belongsTo('session', {async: true}),
  performances: DS.hasMany('performance', {async: true}),
  draw: memberAction({path: 'draw'}),
  resort: memberAction({path: 'resort'}),
  start: memberAction({path: 'start', type: 'post'}),
  finish: memberAction({path: 'finish', type: 'post'}),
  publish: memberAction({path: 'publish', type: 'post'}),
});
