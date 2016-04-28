import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  date: DS.attr(),
  status: DS.attr('certification-status'),
  category: DS.attr('certification-category'),
  person: DS.belongsTo('person', {async: true}),
  judges: DS.hasMany('judge', {async: true}),
  sessions_ca: DS.hasMany('session', {async: true}),
  sessions_aca: DS.hasMany('session', {async: true}),
});
