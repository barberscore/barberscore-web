import DS from 'ember-data';
import {memberAction} from 'ember-api-actions';

export default DS.Model.extend({
  name: DS.attr('string'),
  status: DS.attr('contest-status'),
  cycle: DS.attr('number'),
  is_qualifier: DS.attr('boolean'),
  contestants: DS.hasMany('contestant', {async: true}),
  champion: DS.belongsTo('contestant', {async: true, inverse: 'champion'}),
  primary_contest: DS.belongsTo('session', {async: true, inverse: 'primary'}),
  award: DS.belongsTo('award', {async: true}),
  session: DS.belongsTo('session', {async: true}),
  build: memberAction({path: 'build'}),
});
