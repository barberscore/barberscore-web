import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  mus_points: DS.attr('number'),
  per_points: DS.attr('number'),
  sng_points: DS.attr('number'),
  total_points: DS.attr('number'),
  mus_score: DS.attr('number'),
  per_score: DS.attr('number'),
  sng_score: DS.attr('number'),
  total_score: DS.attr('number'),
  permissions: DS.attr(),
});
