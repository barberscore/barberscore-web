import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  status: DS.attr('contest-status'),
  cycle: DS.attr('number'),
  is_qualifier: DS.attr('boolean'),
  // champion: DS.attr('string'),
  contestants: DS.hasMany('contestant', {async: true}),
  award: DS.belongsTo('award', {async: true}),
  session: DS.belongsTo('session', {async: true}),
});
