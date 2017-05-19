import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  nomen: DS.attr('string'),
  status: DS.attr('chart-status'),
  bhs_id: DS.attr('number'),
  title: DS.attr('string'),
  composers: DS.attr('string'),
  lyricists: DS.attr('string'),
  arrangers: DS.attr('string'),
  holders: DS.attr('string'),
  entity: DS.belongsTo('entity', {async: true}),
  repertories: DS.hasMany('repertory', {async: true}),
  songs: DS.hasMany('song', {async: true}),
  permissions: DS.attr(),
});
