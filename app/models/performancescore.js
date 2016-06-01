import DS from 'ember-data';

export default DS.Model.extend({
  is_advancing: DS.attr('boolean'),
  rank: DS.attr('number'),
  mus_points: DS.attr('number'),
  prs_points: DS.attr('number'),
  sng_points: DS.attr('number'),
  total_points: DS.attr('number'),
  mus_score: DS.attr('number'),
  prs_score: DS.attr('number'),
  sng_score: DS.attr('number'),
  total_score: DS.attr('number'),
  performance: DS.belongsTo('performance', {async: true}),
});
