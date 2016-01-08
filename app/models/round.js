import DS from 'ember-data';

export default DS.Model.extend({
  session: DS.belongsTo('session', {async: true}),
  name: DS.attr('string'),
  kind: DS.attr('round-kind'),
  performances: DS.hasMany('performance', {async: true}),
});
