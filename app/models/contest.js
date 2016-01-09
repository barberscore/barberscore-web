import DS from 'ember-data';

export default DS.Model.extend({
  award: DS.belongsTo('award', {async: true}),
  session: DS.belongsTo('session', {async: true}),
  name: DS.attr('string'),
  slug: DS.attr('string'),
  contestants: DS.hasMany('contestant', {async: true}),
});
