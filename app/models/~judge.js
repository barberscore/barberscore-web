import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  nomen: attr('string'),
  status: attr('judge-status'),
  category: attr('judge-category'),
  kind: attr('judge-kind'),
  start_date: attr('isodate'),
  end_date: attr('isodate'),
  person: belongsTo('person', {async: true}),
  assignments: hasMany('assignment', {async: true}),
  permissions: attr(),

  statusOptions: [
    'New',
    'Active',
    'Inactive',
  ],

  categoryOptions: [
    'Admin',
    'Music',
    'Presentation',
    'Singing',
  ],

  kindOptions: [
    'Chair',
    'Chair',
    'Specialist',
    'DRCJ',
    'Certified',
    'Candidate',
    'Retired',
    'Lapsed',
  ],

});
