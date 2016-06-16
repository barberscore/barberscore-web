import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  status: DS.attr('organization-status'),
  level: DS.attr('organization-level'),
  kind: DS.attr('organization-kind'),
  date: DS.attr('date-range'),
  location: DS.attr('string'),
  spots: DS.attr('number'),
  website: DS.attr('string'),
  facebook: DS.attr('string'),
  twitter: DS.attr('string'),
  email: DS.attr('string'),
  phone: DS.attr('string'),
  picture: DS.attr('string'),
  description: DS.attr('string'),
  short_name: DS.attr('string'),
  long_name: DS.attr('string'),
  lft: DS.attr('number'),
  parent: DS.belongsTo('organization', {inverse: 'children', async: true}),
  children: DS.hasMany('organization', {inverse: 'parent', async: true}),
  conventions: DS.hasMany('convention', {async: true}),
  awards: DS.hasMany('award', {async: true}),
  chapters: DS.hasMany('chapter', {async: true}),
  judges: DS.hasMany('judge', {async: true}),
  groups: DS.hasMany('group', {async: true}),
  performers: DS.hasMany('performer', {inverse: 'representing', async: true}),
  sessions: DS.hasMany('session', {async: true}),
  awardSort: [
    'organization',
    'is_primary:desc',
    'is_novice:desc',
    'is_improved:asc',
    'name',
    'kind',
    'size',
    'scope'
  ],
  sortedAwards: Ember.computed.sort(
    'awards',
    'awardSort'
  )
});
