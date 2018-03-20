import { not } from '@ember/object/computed';
import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  name: DS.attr('string'),
  status: DS.attr('venue-status'),
  city: DS.attr('string'),
  state: DS.attr('string'),
  airport: DS.attr('string'),
  timezone: DS.attr('string'),
  conventions: DS.hasMany('convention', {async: true}),
  permissions: DS.attr(),

  isDisabled: not(
    'permissions.write'
  ),

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
