import { sort, filterBy } from '@ember/object/computed';
import Controller from '@ember/controller';
// import { task, timeout } from 'ember-concurrency';

export default Controller.extend({
  sortedCompetitorsProperties: [
    'totPoints:desc',
  ],
  filteredCompetitors: filterBy(
    'model.session.competitors',
    'totPoints'
  ),
  sortedCompetitors: sort(
    'filteredCompetitors',
    'sortedCompetitorsProperties'
  ),
});
