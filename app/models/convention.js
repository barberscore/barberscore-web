import { computed } from '@ember/object';
import { equal, not } from '@ember/object/computed';
import Model from 'ember-data/model';
import DS from 'ember-data';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  __str__: DS.attr('string'),
  name: DS.attr('string'),
  district: DS.attr('string'),
  status: DS.attr('convention-status'),
  season: DS.attr('convention-season'),
  panel: DS.attr('convention-panel'),
  year: DS.attr('number', {defaultValue: 2019}),
  openDate: DS.attr('isodate'),
  closeDate: DS.attr('isodate'),
  startDate: DS.attr('isodate'),
  endDate: DS.attr('isodate'),
  image: DS.attr('string'),
  imageId: DS.attr('string'),
  location: DS.attr('string', {defaultValue: ''}),
  timezone: DS.attr('string'),
  description: DS.attr('string'),
  venue: DS.belongsTo('venue', {async: true}),
  group: DS.belongsTo('group', {async: true}),
  assignments: DS.hasMany('assignment', {async: true}),
  sessions: DS.hasMany('session', {async: true}),
  permissions: DS.attr(),

  activate: memberAction({path: 'activate', type: 'post'}),
  deactivate: memberAction({path: 'deactivate', type: 'post'}),

  isDisabled: not(
    'permissions.write'
  ),

  isAnnounced: equal('status', 'Announced'),
  isActive: not('isAnnounced'),

  statusOptions: [
    'New',
    'Listed',
    'Opened',
    'Closed',
    'Validated',
    'Started',
    'Finished',
    'Announced',
  ],

  seasonOptions: [
    'Summer',
    'Midwinter',
    'Fall',
    'Spring',
    'Video',
  ],

  panelOptions: [
    'Single',
    'Double',
    'Triple',
    'Quadruple',
    'Quintiple',
  ],
  nomen: computed(
    'district',
    'season',
    'year',
    'name',
    function() {
    return `${this.district} ${this.season} ${this.year} ${this.name}`;
  })
});
