import DS from 'ember-data';

export default DS.Model.extend({
  organization: DS.belongsTo('organization', {async: true}),
  name: DS.attr('string'),
  date: DS.attr('string'),
  kind: DS.attr('convention-kind'),
  // division: DS.attr('convention-division'),
  location: DS.attr('string'),
  // timezone: DS.attr('string'),
  year: DS.attr('string'),
  sessions: DS.hasMany('session', {async: true}),
});
