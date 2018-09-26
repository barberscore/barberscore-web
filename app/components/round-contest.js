import Component from '@ember/component';
import { sort, filterBy } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Component.extend({
  flashMessages: service(),
  sortedContestsProperties: [
    'awardTreeSort',
  ],
  filteredChampionships: filterBy(
    'model.session.contests',
    'notQualifier',
  ),
  filteredContests: filterBy(
    'filteredChampionships',
    'status',
    'Included',
  ),
  sortedContests: sort(
    'filteredContests',
    'sortedContestsProperties'
  ),
  actions: {
    saveModel(model){
      model.save();
      this.flashMessages.success("Saved!");
    },
  }
});
