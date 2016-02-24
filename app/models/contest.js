import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  status: DS.attr('contest-status'),
  champion: DS.attr('string'),
  contestants: DS.hasMany('contestant', {async: true}),
  award: DS.belongsTo('award', {async: true}),
  session: DS.belongsTo('session', {async: true}),
  parent: DS.belongsTo('contest', {inverse: 'children', async: true}),
  children: DS.hasMany('contest', {inverse: 'parent', async: true}),
});
