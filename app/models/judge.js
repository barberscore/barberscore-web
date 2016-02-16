import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  status: DS.attr('judge-status'),
  category: DS.attr('judge-category'),
  kind: DS.attr('judge-kind'),
  designation: DS.attr('string'),
  slot: DS.attr('number'),
  session: DS.belongsTo('session', {async: true}),
  round: DS.belongsTo('round', {async: true}),
  person: DS.belongsTo('person', {async: true}),
  organization: DS.belongsTo('organization', {async: true}),
  sessions: DS.hasMany('session', {async: true}),
  scores: DS.hasMany('score', {async: true}),
});
