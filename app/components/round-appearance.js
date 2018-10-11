import Component from '@ember/component';
import { sort } from '@ember/object/computed';
import { task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),
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
  sortedAppearancesProperties: [
    'num',
  ],
  sortedSongsProperties: [
    'num',
  ],
  sortedAppearances: sort(
    'model.round.appearances',
    'sortedAppearancesProperties',
  ),
  sortedSongs: sort(
    'model.songs',
    'sortedSongsProperties',
  ),
  mockAppearance: task(function *() {
    let appearance = yield this.model.mock({
    });
    yield this.store.pushPayload('appearance', appearance);
    yield this.model.competitor.reload();
    this.flashMessages.success("Mocked!");
  }).drop(),
});
