import Ember from 'ember';
import Model from 'ember-data/model';
import DS from 'ember-data';
import {memberAction} from 'ember-api-actions';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: validator('presence', true),
  });

export default Model.extend(Validations, {
  nomen: DS.attr('string'),
  name: DS.attr('string'),
  slug: DS.attr('string'),
  status: DS.attr('convention-status'),
  kind: DS.attr('convention-kind'),
  season: DS.attr('convention-season'),
  risers: DS.attr('convention-risers'),
  year: DS.attr('number', {defaultValue: 2017}),
  location: DS.attr('string', {defaultValue: ''}),
  panel: DS.attr('convention-panel'),
  open_date: DS.attr('isodate'),
  close_date: DS.attr('isodate'),
  start_date: DS.attr('isodate'),
  end_date: DS.attr('isodate'),
  venue: DS.belongsTo('venue', {async: true}),
  entity: DS.belongsTo('entity', {async: true}),
  assignments: DS.hasMany('assignment', {async: true}),
  sessions: DS.hasMany('session', {async: true}),
  permissions: DS.attr(),
  list_fsm: memberAction({path: 'list_fsm', type: 'post'}),
  open_fsm: memberAction({path: 'open_fsm', type: 'post'}),
  start_fsm: memberAction({path: 'start_fsm', type: 'post'}),
  finish_fsm: memberAction({path: 'finish_fsm', type: 'post'}),

  isPublished: Ember.computed.equal('status', 'Published'),
  isActive: Ember.computed.not('isPublished'),

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
