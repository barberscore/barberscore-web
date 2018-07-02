import { sort } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  sortedCompetitorsProperties: [
    'statusSort',
    'totRank',
    'groupName',
  ],
  sortedCompetitors: sort(
    'model.competitors',
    'sortedCompetitorsProperties'
  ),
});


