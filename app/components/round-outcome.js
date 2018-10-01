import Component from '@ember/component';
import { sort, filterBy } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  flashMessages: service(),
  sortedContestsProperties: [
    'num',
  ],
  sortedContestantsProperties: [
    'competitorTotPoints:desc',
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
  filteredContestants: filterBy(
    'model.contest.contestants',
    'status',
    'Included',
  ),
  sortedOutcomes: sort(
    'model.round.outcomes',
    'sortedContestsProperties'
  ),
  sortedContestants: sort(
    'filteredContestants',
    'sortedContestantsProperties'
  ),
  autosave: task(function* (property){
    yield timeout(200);
    try {
      yield property.save();
    } catch(e) {
      e.errors.forEach((error) => {
        this.flashMessages.danger(error.detail);
      })
    }
  }).restartable(),
  actions: {
    saveModel(model){
      model.save();
      this.flashMessages.success("Saved!");
    },
  }
});
