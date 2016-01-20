import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  kind: DS.attr('person-kind'),
  status: DS.attr('person-status'),
  date: DS.attr('date'),
  location: DS.attr('string'),
  website: DS.attr('string'),
  facebook: DS.attr('string'),
  twitter: DS.attr('string'),
  email: DS.attr('string'),
  phone: DS.attr('string'),
  picture: DS.attr('string'),
  description: DS.attr('string'),
  common_name: DS.attr('string'),
  full_name: DS.attr('string'),
  formal_name: DS.attr('string'),
  organization: DS.belongsTo('organization', {async: true}),
});
