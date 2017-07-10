import Ember from 'ember';
import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  nomen: DS.attr('string'),
  status: DS.attr('contest-status'),
  isQualifier: DS.attr('boolean'),
  kind: DS.attr('contest-kind'),
  champion: DS.belongsTo('entry', {async: true}),
  session: DS.belongsTo('session', {async: true}),
  award: DS.belongsTo('award', {async: true}),
  contestants: DS.hasMany('contestant', {async: true}),
  permissions: DS.attr(),

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

  entityKindSort: Ember.computed.alias('award.entity.kindSort'),
  awardQualifier: Ember.computed.alias('award.isQualifier'),
  awardPrimary: Ember.computed.alias('award.isPrimary'),
  awardAgeSort: Ember.computed.alias('award.ageSort'),
  awardName: Ember.computed.alias('award.name'),
});
