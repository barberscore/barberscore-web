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
  sortedImprovedContendersProperties: [
    'diff:desc',
    'runSngSum:desc',
    'runPerSum:desc',
    'name',
  ],
  sortedContenders: sort(
    'model.appearances',
    'sortedContendersProperties'
  ),
  sortedImprovedContenders: sort(
    'model.appearances',
    'sortedImprovedContendersProperties'
  ),
  autosave: task(function* (property){
    console.log('property', property);
    yield timeout(200);
    try {
      yield this.model.save();
      this.flashMessages.success("Saved!");
    } catch(e) {
      console.log('error', e)
      e.errors.forEach((error) => {
        this.flashMessages.danger(error.detail);
      })
    }
  }).restartable(),
});
