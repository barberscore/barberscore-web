import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {hasMany} from 'ember-data/relationships';

export default Model.extend({
  nomen: attr('string'),
  status: attr('catalog-status'),
  bhs_id: attr('number'),
  title: attr('string'),
  composers: attr('string'),
  arrangers: attr('string'),
  holders: attr('string'),
  performer: hasMany('submissions', {async: true}),
  permissions: attr(),
});
