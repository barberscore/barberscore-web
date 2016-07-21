import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo} from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  status: attr('songscore-status'),
  mus_points: attr('number'),
  prs_points: attr('number'),
  sng_points: attr('number'),
  total_points: attr('number'),
  mus_score: attr('number'),
  prs_score: attr('number'),
  sng_score: attr('number'),
  total_score: attr('number'),
  song: belongsTo('song', {async: true}),
});
