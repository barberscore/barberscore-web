import { equal, not, alias } from '@ember/object/computed';
import Model from 'ember-data/model';
import DS from 'ember-data';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  nomen: DS.attr('string'),
  name: DS.attr('string'),
  status: DS.attr('convention-status'),
  season: DS.attr('convention-season'),
  panel: DS.attr('convention-panel'),
  year: DS.attr('number', {defaultValue: 2018}),
  openDate: DS.attr('isodate'),
  closeDate: DS.attr('isodate'),
  startDate: DS.attr('isodate'),
  endDate: DS.attr('isodate'),
  location: DS.attr('string', {defaultValue: ''}),
  description: DS.attr('string'),
  venue: DS.belongsTo('venue', {async: true}),
  group: DS.belongsTo('group', {async: true}),
  assignments: DS.hasMany('assignment', {async: true}),
  sessions: DS.hasMany('session', {async: true}),
  grantors: DS.hasMany('grantor', {async: true}),
  permissions: DS.attr(),

  publish: memberAction({path: 'publish', type: 'post'}),
  archive: memberAction({path: 'archive', type: 'post'}),

  isAnnounced: equal('status', 'Announced'),
  isActive: not('isAnnounced'),

  groupKindSort: alias('group.kindSort'),
  groupNomen: alias('group.nomen'),

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
});
