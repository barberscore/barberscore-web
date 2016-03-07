import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  status: DS.attr('judge-status'),
  category: DS.attr('judge-category'),
  designation: DS.attr('string'),
  kind: DS.attr('judge-kind'),
  slot: DS.attr('number'),
  person: DS.belongsTo('person', {async: true}),
  session: DS.belongsTo('session', {async: true}),
  scores: DS.hasMany('score', {async: true}),
});
