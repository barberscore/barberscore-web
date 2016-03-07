import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  status: DS.attr('performance-status'),
  slot: DS.attr('number'),
  scheduled: DS.attr(),
  actual: DS.attr(),
  mus_points: DS.attr('number'),
  prs_points: DS.attr('number'),
  sng_points: DS.attr('number'),
  total_points: DS.attr('number'),
  mus_score: DS.attr('number'),
  prs_score: DS.attr('number'),
  sng_score: DS.attr('number'),
  total_score: DS.attr('number'),
  round: DS.belongsTo('round', {async: true}),
  performer: DS.belongsTo('performer', {async: true}),
  songs: DS.hasMany('song', {async: true}),
});
