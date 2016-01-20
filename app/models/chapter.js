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
  code: DS.attr('string'),
  organization: DS.belongsTo('organization', {async: true}),
  groups: DS.belongsTo('group', {async: true}),
});
