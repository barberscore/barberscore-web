import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  nomen: DS.attr('string'),
  status: DS.attr('repertory-status'),
  chart: DS.belongsTo('chart', {async: true}),
  entity: DS.belongsTo('entity', {async: true}),
  submissions: DS.hasMany('submission', {async: true}),
  permissions: DS.attr(),

  statusOptions: [
    'New',
    'Active',
    'Inactive',
  ],

});
