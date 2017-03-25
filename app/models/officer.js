import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo} from 'ember-data/relationships';

export default Model.extend({
  nomen: attr('string'),
  status: attr('officer-status'),
  start_date: attr('isodate'),
  finish_date: attr('isodate'),
  office: belongsTo('office', {async: true}),
  person: belongsTo('person', {async: true}),
  permissions: attr(),

  statusOptions: [
    'New',
    'Active',
    'Inactive',
  ],

});
