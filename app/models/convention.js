import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  slug: DS.attr('string'),
  status: DS.attr('convention-status'),
  kind: DS.attr('convention-kind'),
  division: DS.attr('convention-division'),
  season: DS.attr('convention-season'),
  risers: DS.attr(),
  level: DS.attr('convention-level'),
  year: DS.attr('number'),
  date: DS.attr('date-range'),
  venue: DS.belongsTo('venue', {async: true}),
  organization: DS.belongsTo('organization', {async: true}),
  drcj: DS.belongsTo('person', {async: true}),
  sessions: DS.hasMany('session', {async: true}),
  participants: DS.hasMany('participant', {async: true}),
});
