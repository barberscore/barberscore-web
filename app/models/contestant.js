import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo} from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  status: attr('contestant-status'),
  contestscore: belongsTo('contestantscore', {async: true}),
  contest: belongsTo('contest', {async: true}),
  performer: belongsTo('performer', {async: true}),
  permissions: attr(),
});
