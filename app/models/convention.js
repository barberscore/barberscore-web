import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo, hasMany } from 'ember-data/relationships';
import {memberAction} from 'ember-api-actions';

export default Model.extend({
  nomen: attr('string'),
  name: attr('string'),
  slug: attr('string'),
  status: attr('convention-status'),
  kind: attr('convention-kind'),
  season: attr('convention-season'),
  risers: attr('convention-risers'),
  year: attr('number', {defaultValue: 2017}),
  location: attr('string', {defaultValue: ''}),
  panel: attr('convention-panel'),
  start_date: attr('isodate'),
  end_date: attr('isodate'),
  venue: belongsTo('venue', {async: true}),
  entity: belongsTo('entity', {async: true}),
  assignments: hasMany('assignment', {async: true}),
  sessions: hasMany('session', {async: true}),
  permissions: attr(),
  start: memberAction({path: 'start', type: 'post'}),
  finish: memberAction({path: 'finish', type: 'post'}),

  statusOptions: [
    'New',
    'Listed',
    'Opened',
    'Closed',
    'Validated',
    'Started',
    'Finished',
    'Published',
  ],

  kindOptions: [
    'International',
    'District',
    'Division',
    'District and Division',
  ],

  levelOptions: [
    'International',
    'District',
    'Division',
    'Chapter',
  ],

  seasonOptions: [
    'Summer',
    'Midwinter',
    'Fall',
    'Spring',
    'Video',
  ],

  panelOptions: [
    'Unknown',
    'Single',
    'Double',
    'Triple',
    'Quadruple',
    'Quintiple',
  ],

  riserOptions: [
    0,3,4,5,6,7,8,9,10,11,12,13
  ],

});
