import DS from 'ember-data';

export default DS.Model.extend({
  group: DS.belongsTo('group', {async: true}),
  session: DS.belongsTo('session', {async: true}),
  name: DS.attr('string'),
  slug: DS.attr('string'),
  performances: DS.hasMany('performance', {async: true}),
  contestants: DS.hasMany('contestant', {async: true}),
});
