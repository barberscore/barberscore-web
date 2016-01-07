import DS from 'ember-data';

export default DS.Model.extend({
  session: DS.belongsTo('session', {async: true}),
  name: DS.attr('string'),
  contestants: DS.hasMany('contestant', {async: true}),
});
