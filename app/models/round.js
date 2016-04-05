import DS from 'ember-data';
import {memberAction} from 'ember-api-actions';

export default DS.Model.extend({
  name: DS.attr('string'),
  status: DS.attr('round-status'),
  kind: DS.attr('round-kind'),
  num: DS.attr('number'),
  session: DS.belongsTo('session', {async: true}),
  performances: DS.hasMany('performance', {async: true}),
  draw: memberAction({path: 'draw'}),
  promote: memberAction({path: 'promote'}),
  resort: memberAction({path: 'resort'}),
  start: memberAction({path: 'start'}),
  finish: memberAction({path: 'finish'}),
});
