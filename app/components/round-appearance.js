import Component from '@ember/component';
import { sort } from '@ember/object/computed';
import { task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),
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
    yield this.get('store').pushPayload('appearance', appearance);
    yield this.get('model.songs').invoke('reload');
    this.get('flashMessages').success("Mocked!");
  }).drop(),
});
