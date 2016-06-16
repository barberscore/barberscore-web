import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  date: attr(),
  status: attr('certification-status'),
  category: attr('certification-category'),
  person: belongsTo('person', {async: true}),
  judges: hasMany('judge', {async: true}),
});
