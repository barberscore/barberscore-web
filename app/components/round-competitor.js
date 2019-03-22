import Component from '@ember/component';
import { sort, filterBy } from '@ember/object/computed';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  autosave: task(function* (property, value){
    this.model.set(property, value);
    yield timeout(1000);
    try {
      yield this.model.save();
      this.flashMessages.success("Saved");
    } catch(e) {
      e.errors.forEach((error) => {
        this.flashMessages.danger(error.detail);
      })
    }
  }).restartable(),
  sortedCompetitorsProperties: [
    'statusSort',
    'stats.tot.points:desc',
    'groupName',
  ],
  sortedCompetitors: sort(
    'model.session.competitors',
    'sortedCompetitorsProperties'
  ),
  sortedContestantsProperties: [
    'contestAwardName',
  ],
  filteredContestants: filterBy(
    'model.entry.contestants',
    'status',
    'Included',
  ),
  sortedContestants: sort(
    'filteredContestants',
    'sortedContestantsProperties',
  ),
});
