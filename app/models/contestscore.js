import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo} from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  status: attr('contestscore-status'),
  contest: belongsTo('contest', {async: true}),
  champion: belongsTo('champion', {async: true}),
});
