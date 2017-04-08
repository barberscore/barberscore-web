import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo, hasMany } from 'ember-data/relationships';
import {memberAction} from 'ember-api-actions';

export default Model.extend({
  nomen: attr('string'),
  status: attr('contest-status'),
  cycle: attr('number'),
  is_qualifier: attr('boolean'),
  kind: attr('contest-kind'),
  contestants: hasMany('contestant', {async: true}),
  primary_contest: belongsTo('session', {async: true, inverse: 'primary'}),
  award: belongsTo('award', {async: true}),
  session: belongsTo('session', {async: true}),
  contestprivate: belongsTo('contestprivate', {async: true}),
  permissions: attr(),

  build: memberAction({path: 'build'}),

  statusOptions: [
    'New',
    'Opened',
    'Closed',
    'Validated',
    'Finished',
    'Published',
  ],

  kindOptions: [
    'New',
    'Championship',
    'Qualifier',
  ],

  entityKindSort: Ember.computed.alias('award.entity.entityKindSort'),
  awardQualifier: Ember.computed.alias('award.is_qualifier'),
  awardPrimary: Ember.computed.alias('award.is_primary'),
  awardAgeSort: Ember.computed.alias('award.ageSort'),
  awardName: Ember.computed.alias('award.name'),
});
