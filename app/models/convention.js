import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  slug: DS.attr('string'),
  status: DS.attr('convention-status'),
  kind: DS.attr('convention-kind'),
  season: DS.attr('convention-season'),
  risers: DS.attr(),
  level: DS.attr('convention-level'),
  year: DS.attr('number'),
  date: DS.attr('date-range'),
  venue: DS.belongsTo('venue', {async: true}),
  organization: DS.belongsTo('organization', {async: true}),
  drcj: DS.belongsTo('person', {async: true}),
  sessions: DS.hasMany('session', {async: true}),
  sessionSortProperties: ['kind:asc',],
  sortedSessions: Ember.computed.sort(
    'sessions',
    'sessionSortProperties'
  ),
  riserChoices: [
    0,3,4,5,6,7,8,9,10,11,12,13
  ],
});
