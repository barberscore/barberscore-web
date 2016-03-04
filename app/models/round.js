import DS from 'ember-data';
import {memberAction} from 'ember-api-actions';

export default DS.Model.extend({
  name: DS.attr('string'),
  status: DS.attr('round-status'),
  kind: DS.attr('round-kind'),
  num: DS.attr('number'),
  date: DS.attr('string'),
  slots: DS.attr('number'),
  session: DS.belongsTo('session', {async: true}),
  performances: DS.hasMany('performance', {async: true}),
  judges: DS.hasMany('judge', {async: true}),
  draw: memberAction({path: 'draw'}),
});
