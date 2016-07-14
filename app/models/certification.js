import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  status: attr('certification-status'),
  category: attr('certification-category'),
  kind: attr('certification-kind'),
  start_date: attr('isodate'),
  end_date: attr('isodate'),
  person: belongsTo('person', {async: true}),
  judges: hasMany('judge', {async: true}),
});
