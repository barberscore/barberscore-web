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
  repertories: hasMany('repertory', {async: true}),
  songs: hasMany('song', {async: true}),
  permissions: attr(),
});
