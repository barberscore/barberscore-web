import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  date: DS.attr('date'),
  location: DS.attr('string'),
  website: DS.attr('string'),
  facebook: DS.attr('string'),
  twitter: DS.attr('string'),
  email: DS.attr('string'),
  phone: DS.attr('string'),
  picture: DS.attr('string'),
  description: DS.attr('string'),
  status: DS.attr('chapter-status'),
  kind: DS.attr('chapter-kind'),
  chapter: DS.belongsTo('chapter', {async: true}),
  organization: DS.belongsTo('organization', {async: true}),
  performers: DS.hasMany('performers', {async: true}),
});
