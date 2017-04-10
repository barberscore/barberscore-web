import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  nomen: DS.attr('string'),
  name: DS.attr('string'),
  location: DS.attr('string'),
  city: DS.attr('string'),
  state: DS.attr('string'),
  airport: DS.attr('string'),
  timezone: DS.attr('string'),
  conventions: DS.hasMany('convention', {async: true}),
  permissions: DS.attr(),
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
