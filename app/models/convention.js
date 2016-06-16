import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  slug: attr('string'),
  status: attr('convention-status'),
  kind: attr('convention-kind'),
  season: attr('convention-season'),
  risers: attr(),
  level: attr('convention-level'),
  year: attr('number'),
  date: attr('date-range'),
  venue: belongsTo('venue', {async: true}),
  organization: belongsTo('organization', {async: true}),
  drcj: belongsTo('person', {async: true}),
  sessions: hasMany('session', {async: true}),

  sessionSort: [
    'kind:asc',
  ],
  sortedSessions: Ember.computed.sort(
    'sessions',
    'sessionSort'
  ),

  riserChoices: [
    0,3,4,5,6,7,8,9,10,11,12,13
  ],
});
