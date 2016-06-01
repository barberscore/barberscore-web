import DS from 'ember-data';

export default DS.Model.extend({
  rank: DS.attr('number'),
  mus_points: DS.attr('number'),
  prs_points: DS.attr('number'),
  sng_points: DS.attr('number'),
  total_points: DS.attr('number'),
  mus_score: DS.attr('number'),
  prs_score: DS.attr('number'),
  sng_score: DS.attr('number'),
  total_score: DS.attr('number'),
  performer: DS.belongsTo('performer', {async: true}),
});
