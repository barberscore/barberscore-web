import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  nomen: attr('string'),
  name: attr('string'),
  kind: attr('person-kind'),
  status: attr('person-status'),
  start_date: attr('isodate'),
  finish_date: attr('isodate'),
  location: attr('string', {defaultValue:''}),
  website: attr('string', {defaultValue:''}),
  facebook: attr('string', {defaultValue:''}),
  twitter: attr('string', {defaultValue:''}),
  email: attr('string', {defaultValue:''}),
  phone: attr('string', {defaultValue:''}),
  picture: attr('string', {defaultValue:''}),
  description: attr('string', {defaultValue:''}),
  common_name: attr('string'),
  full_name: attr('string'),
  formal_name: attr('string'),
  first_name: attr('string'),
  last_name: attr('string'),
  nick_name: attr('string'),
  memberships: hasMany('membership', {async: true}),
  assignments: hasMany('assignment', {async: true}),
  user: belongsTo('user', {async: true}),
  permissions: attr(),

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
