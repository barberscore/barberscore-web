import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {hasMany} from 'ember-data/relationships';

export default Model.extend({
  nomen: attr('string'),
  name: attr('string'),
  status: attr('office-status'),
  kind: attr('office-kind'),
  short_name: attr('string'),
  long_name: attr('string'),
  officers: hasMany('officer', {async: true}),
  permissions: attr(),

  statusOptions: [
    'New',
    'Active',
    'Inactive',
  ],

  kindOptions: [
    'Organization',
    'District',
    'Noncompetitive',
    'Affiliate',
    'Division',
    'Quartet',
    'Chorus',
    'Very Large Quartet',
    'Mixed Group',
  ],

});
