import { alias } from '@ember/object/computed';
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
    'Announced',
  ],

  kindOptions: [
    'New',
    'Championship',
    'Qualifier',
  ],

  organizationKindSort: alias('award.organization.kindSort'),
  awardQualifier: alias('award.isQualifier'),
  awardPrimary: alias('award.isPrimary'),
  awardAgeSort: alias('award.ageSort'),
  awardName: alias('award.name'),
});
