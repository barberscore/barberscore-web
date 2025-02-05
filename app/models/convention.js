import { not } from '@ember/object/computed';
import Model from '@ember-data/model';
import DS from 'ember-data';
import { apiAction } from '@mainmatter/ember-api-actions';

export default Model.extend({
  nomen: DS.attr('string'),
  status: DS.attr('convention-status'),
  name: DS.attr('string'),
  district: DS.attr('convention-district'),
  season: DS.attr('convention-season'),
  panel: DS.attr('convention-panel'),
  year: DS.attr('number', {defaultValue: 2019}),
  openDate: DS.attr('isodate'),
  closeDate: DS.attr('isodate'),
  startDate: DS.attr('isodate'),
  endDate: DS.attr('isodate'),
  venueName: DS.attr('string', {defaultValue: ''}),
  location: DS.attr('string', {defaultValue: ''}),
  timezone: DS.attr('string'),
  description: DS.attr('string'),
  divisions: DS.attr(),
  kinds: DS.attr(),

  roundsFinalized: DS.attr('boolean'),
  baseFilename: DS.attr('string'),

  imageId: DS.attr('string'),
  persons: DS.hasMany('person', {async: true, inverse: 'conventions'}),
  owners: DS.hasMany('user', {async: true, inverse: 'conventions'}),
  permissions: DS.attr(),

  reset: async function (data) {
    return await apiAction(this, {path: 'reset', method: 'POST'})
  },
  build: async function (data) {
    return await apiAction(this, {path: 'build', method: 'POST'})
  },
  activate: async function (data) {
    return await apiAction(this, {path: 'activate', method: 'POST'})
  },
  deactivate: async function (data) {
    return await apiAction(this, {path: 'deactivate', method: 'POST'})
  },

  bbstix: async function (data) {
    return await apiAction(this, { path: 'bbstix', method: 'GET', adapterOptions: { arraybuffer: true, responseType: 'arraybuffer', ajaxOptions: { dataType: 'text' } } })
  },
  bbstixPractice: async function (data) {
    return await apiAction(this, { path: 'bbstix_practice', method: 'GET', adapterOptions: { arraybuffer: true, responseType: 'arraybuffer' } })
  },

  isDisabled: not(
    'permissions.write'
  ),

  statusOptions: [
    'New',
    'Built',
    'Active',
    'Inactive',
    'Cancelled',
  ],

  seasonOptions: [
    'Fall',
    'Spring',
  ],

  panelOptions: [
    'Single',
    'Double',
    'Triple',
    'Quadruple',
    'Quintiple',
  ],
});
