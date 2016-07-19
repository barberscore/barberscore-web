import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  status: attr('organization-status'),
  level: attr('organization-level'),
  kind: attr('organization-kind'),
  start_date: attr('isodate'),
  finish_date: attr('isodate'),
  location: attr('string'),
  spots: attr('number'),
  website: attr('string'),
  facebook: attr('string'),
  twitter: attr('string'),
  email: attr('string'),
  phone: attr('string'),
  picture: attr('string'),
  description: attr('string'),
  short_name: attr('string'),
  long_name: attr('string'),
  lft: attr('number'),
  parent: belongsTo('organization', {inverse: 'children', async: true}),
  children: hasMany('organization', {inverse: 'parent', async: true}),
  conventions: hasMany('convention', {async: true}),
  awards: hasMany('award', {async: true}),
  chapters: hasMany('chapter', {async: true}),
  assignments: hasMany('assignment', {async: true}),
  groups: hasMany('group', {async: true}),
  performers: hasMany('performer', {inverse: 'representing', async: true}),
  sessions: hasMany('session', {async: true}),
  hosts: hasMany('host', {async: true}),
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
