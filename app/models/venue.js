import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {hasMany } from 'ember-data/relationships';

export default Model.extend({
  nomen: attr('string'),
  name: attr('string'),
  location: attr('string'),
  city: attr('string'),
  state: attr('string'),
  airport: attr('string'),
  timezone: attr('string'),
  conventions: hasMany('convention', {async: true}),
  permissions: attr(),
  timezoneChoices: [
    'US/Arizona',
    'US/Central',
    'US/Eastern',
    'US/Hawaii',
    'US/Mountain',
    'US/Pacific',
  ],
  statusOptions: [
    'New',
    'Active',
    'Inactive',
  ],
});
