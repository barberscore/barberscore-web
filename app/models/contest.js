import Ember from 'ember';
import Model from 'ember-data/model';
import DS from 'ember-data';
import {memberAction} from 'ember-api-actions';

export default Model.extend({
  nomen: DS.attr('string'),
  status: DS.attr('contest-status'),
  cycle: DS.attr('number'),
  is_qualifier: DS.attr('boolean'),
  kind: DS.attr('contest-kind'),
  contestants: DS.hasMany('contestant', {async: true}),
  primary_contest: DS.belongsTo('session', {async: true, inverse: 'primary'}),
  award: DS.belongsTo('award', {async: true}),
  session: DS.belongsTo('session', {async: true}),
  contestprivate: DS.belongsTo('contestprivate', {async: true}),
  permissions: DS.attr(),

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
