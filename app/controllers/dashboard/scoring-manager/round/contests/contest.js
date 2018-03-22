import { sort } from '@ember/object/computed';
import Controller from '@ember/controller';
import { task, timeout } from 'ember-concurrency';

export default Controller.extend({
  sortedContestantsProperties: [
    'entryTotPoints:desc',
  ],
  sortedContestants: sort(
    'model.contestants',
    'sortedContestantsProperties'
  ),
  contestsSortProperties: [
    'nomen',
  ],
  sortedItems: sort(
    'model.session.contests',
    'contestsSortProperties'
  ),
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
});