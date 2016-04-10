import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  status: DS.attr('group-status'),
  date: DS.attr('date'),
  location: DS.attr('string'),
  website: DS.attr('string'),
  facebook: DS.attr('string'),
  twitter: DS.attr('string'),
  email: DS.attr('string'),
  phone: DS.attr('string'),
  picture: DS.attr('string'),
  description: DS.attr('string'),
  kind: DS.attr('group-kind'),
  age: DS.attr('group-age'),
  is_novice: DS.attr('boolean'),
  chapter: DS.belongsTo('chapter', {async: true}),
  organization: DS.belongsTo('organization', {async: true}),
  performers: DS.hasMany('performers', {async: true}),
  roles: DS.hasMany('role', {async: true}),
});
