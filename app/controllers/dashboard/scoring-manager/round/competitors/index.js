import { sort } from '@ember/object/computed';
// import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
// import { task, timeout } from 'ember-concurrency';

export default Controller.extend({
  sortedCompetitorsProperties: [
    'nomen',
  ],
  sortedCompetitors: sort(
    'model.session.competitors',
    'sortedCompetitorsProperties'
  ),
});
