import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  status: DS.attr('convention-status'),
  kind: DS.attr('convention-kind'),
  division: DS.attr('convention-division'),
  year: DS.attr('number'),
  date: DS.attr('string'),
  location: DS.attr('string'),
  // timezone: DS.attr('string'),
  organization: DS.belongsTo('organization', {async: true}),
  sessions: DS.hasMany('session', {async: true}),
});
