import { not } from '@ember/object/computed';
import Model, { attr, hasMany }  from '@ember-data/model';
import { apiAction } from '@mainmatter/ember-api-actions';

export default Model.extend({
  nomen: attr('string'),
  status: attr('convention-status'),
  name: attr('string'),
  district: attr('convention-district'),
  season: attr('convention-season'),
  panel: attr('convention-panel'),
  year: attr('number', {defaultValue: 2019}),
  openDate: attr('isodate'),
  closeDate: attr('isodate'),
  startDate: attr('isodate'),
  endDate: attr('isodate'),
  venueName: attr('string', {defaultValue: ''}),
  location: attr('string', {defaultValue: ''}),
  timezone: attr('string'),
  description: attr('string'),
  divisions: attr(),
  kinds: attr(),

  roundsFinalized: attr('boolean'),
  baseFilename: attr('string'),

  imageId: attr('string'),
  persons: hasMany('person', {async: true, inverse: 'conventions'}),
  owners: hasMany('user', {async: true, inverse: 'conventions'}),
  permissions: attr(),

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
