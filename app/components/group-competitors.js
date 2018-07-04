import { sort, filterBy } from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
  activeCompetitors: filterBy(
    'model.competitors',
    'conventionStatus',
    'Active',
  ),
  finishedCompetitors: filterBy(
    'activeCompetitors',
    'status',
    'Finished',
  ),
  sortedCompetitorsProperties: [
    'roundDate:desc',
  ],
  sortedCompetitors: sort(
    'finishedCompetitors',
    'sortedCompetitorsProperties',
  ),
});


