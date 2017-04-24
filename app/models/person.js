import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  nomen: DS.attr('string'),
  name: DS.attr('string'),
  kind: DS.attr('person-kind'),
  status: DS.attr('person-status'),
  start_date: DS.attr('isodate'),
  finish_date: DS.attr('isodate'),
  bhs_id: DS.attr('number'),
  location: DS.attr('string', {defaultValue:''}),
  website: DS.attr('string', {defaultValue:''}),
  facebook: DS.attr('string', {defaultValue:''}),
  twitter: DS.attr('string', {defaultValue:''}),
  email: DS.attr('string', {defaultValue:''}),
  phone: DS.attr('string', {defaultValue:''}),
  picture: DS.attr('string', {defaultValue:''}),
  description: DS.attr('string', {defaultValue:''}),
  common_name: DS.attr('string'),
  full_name: DS.attr('string'),
  formal_name: DS.attr('string'),
  first_name: DS.attr('string'),
  last_name: DS.attr('string'),
  nick_name: DS.attr('string'),
  international: DS.attr('string'),
  district: DS.attr('string'),
  division: DS.attr('string'),
  chapter: DS.attr('string'),
  representing: DS.belongsTo('entity', {async: true}),
  officers: DS.hasMany('officer', {async: true}),
  members: DS.hasMany('member', {async: true}),
  assignments: DS.hasMany('assignment', {async: true}),
  user: DS.belongsTo('user', {async: true}),
  permissions: DS.attr(),

  statusOptions: [
    'New',
    'Active',
    'Inactive',
    'Retired',
    'Deceased',
    '(Six)',
    '(Nine)',
  ],

  kindOptions: [
    'New',
    'Member',
    'Non-Member',
    'Associate',
  ],

});
