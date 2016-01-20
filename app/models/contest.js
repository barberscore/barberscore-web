import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  status: DS.attr('contest-status'),
  goal: DS.attr('contest-goal'),
  qual_score: DS.attr('number'),
  year: DS.attr('number'),
  rounds: DS.attr('number'),
  session: DS.belongsTo('session', {async: true}),
  award: DS.belongsTo('award', {async: true}),
  contestants: DS.hasMany('contestant', {async: true}),
});
