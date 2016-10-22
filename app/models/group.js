import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo, hasMany } from 'ember-data/relationships';
const {computed} = Ember;

export default Model.extend({
  name: attr('string'),
  nomen: attr('string'),
  status: attr('group-status'),
  start_date: attr('isodate'),
  finish_date: attr('isodate'),
  location: attr('string'),
  website: attr('string'),
  facebook: attr('string'),
  twitter: attr('string'),
  email: attr('string'),
  phone: attr('string'),
  picture: attr('string'),
  description: attr('string'),
  kind: attr('group-kind'),
  age: attr('group-age'),
  is_novice: attr('boolean'),
  chapter: belongsTo('chapter', {async: true}),
  organization: belongsTo('organization', {async: true}),
  performers: hasMany('performers', {async: true}),
  roles: hasMany('role', {async: true}),
  permissions: attr(),

  roleSort: [
    'partSort',
  ],

  sortedRoles: computed.sort(
    'roles',
    'roleSort'
  ),
});
