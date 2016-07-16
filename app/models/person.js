import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
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
  nomen: attr('string'),
  common_name: attr('string'),
  full_name: attr('string'),
  formal_name: attr('string'),
  first_name: attr('string'),
  last_name: attr('string'),
  nick_name: attr('string'),
  organization: belongsTo('organization', {async: true}),
  chapter: belongsTo('chapter', {async: true}),
  certifications: hasMany('certification', {async: true}),
  roles: hasMany('role', {async: true}),
  panels: hasMany('judge', {async: true}),
  conventions: hasMany('convention', {inverse:'drcj', async: true}),
});
