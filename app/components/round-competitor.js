import Component from '@ember/component';
import { sort, filterBy } from '@ember/object/computed';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  autosave: task(function* (property, value){
    this.get('model').set(property, value);
    yield timeout(1000);
    try {
      yield this.get('model').save();
      this.get('flashMessages').success("Saved");
    } catch(e) {
      e.errors.forEach((error) => {
        this.get('flashMessages').danger(error.detail);
      })
    }
  }).restartable(),
  sortedCompetitorsProperties: [
    'totPoints:desc',
  ],
  sortedCompetitors: sort(
    'model.session.competitors',
    'sortedCompetitorsProperties',
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
