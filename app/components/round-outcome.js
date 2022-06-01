import Component from '@ember/component';
import { sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
export default Component.extend({
  store: service(),
  flashMessages: service(),
  sortedContestsProperties: [
    'num',
  ],
  sortedOutcomes: sort(
    'model.round.outcomes',
    'sortedContestsProperties'
  ),
  sortedContendersProperties: [
    'runTotSum:desc',
    'runSngSum:desc',
    'runPerSum:desc',
    'name',
  ],
  sortedContenders: sort(
    'model.appearances',
    'sortedContendersProperties'
  ),
  autosave: task(function* (property){
    yield timeout(200);
    try {
      yield property.save();
      this.flashMessages.success("Saved!");
    } catch(e) {
      e.errors.forEach((error) => {
        this.flashMessages.danger(error.detail);
      })
    }
  }).restartable(),
});
