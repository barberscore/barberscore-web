import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo, hasMany} from 'ember-data/relationships';

export default Model.extend({
  nomen: attr('string'),
  status: attr('repertory-status'),
  chart: belongsTo('chart', {async: true}),
  entity: belongsTo('entity', {async: true}),
  submissions: hasMany('submission', {async: true}),
  permissions: attr(),

  statusOptions: [
    'New',
    'Active',
    'Inactive',
  ],

});
