import { not } from '@ember/object/computed';
import Model from 'ember-data/model';
import DS from 'ember-data';
import { memberAction } from 'ember-api-actions';

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

  hasPracticePanelists: DS.attr('boolean'),
  roundsFinalized: DS.attr('boolean'),
  bbstixBaseFilename: DS.attr('string'),

  imageId: DS.attr('string'),
  persons: DS.hasMany('person', {async: true}),
  owners: DS.hasMany('user', {async: true}),
  permissions: DS.attr(),

  reset: memberAction({path: 'reset', type: 'post'}),
  build: memberAction({path: 'build', type: 'post'}),
  activate: memberAction({path: 'activate', type: 'post'}),
  deactivate: memberAction({path: 'deactivate', type: 'post'}),

  bbstix: memberAction({ path: 'bbstix', type: 'get', ajaxOptions: { arraybuffer: true } }),
  bbstixPractice: memberAction({ path: 'bbstix_practice', type: 'get', ajaxOptions: { arraybuffer: true } }),

  isDisabled: not(
    'permissions.write'
  ),

  statusOptions: [
    'New',
    'Built',
    'Active',
    'Inactive',
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
