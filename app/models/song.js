import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  // status: DS.attr('song-status'),
  // order: DS.attr('song-order'),
  title: DS.attr('string'),
  arranger: DS.attr('string'),
  mus_points: DS.attr('number'),
  prs_points: DS.attr('number'),
  sng_points: DS.attr('number'),
  total_points: DS.attr('number'),
  mus_score: DS.attr('number'),
  prs_score: DS.attr('number'),
  sng_score: DS.attr('number'),
  total_score: DS.attr('number'),
  catalog: DS.belongsTo('catalog', {async: true}),
  tune: DS.belongsTo('tune', {async: true}),
  performance: DS.belongsTo('performance', {async: true}),
});
