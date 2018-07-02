import { sort, filterBy } from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
  filteredCompetitors: filterBy(
    'model.competitors',
    'conventionStatus',
    'Active',
  ),
  sortedCompetitorsProperties: [

  ],
  sortedCompetitors: sort(
    'filteredCompetitors',
    'sortedCompetitorsProperties',
  ),
});


