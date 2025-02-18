import Component from '@ember/component';
import { sort } from '@ember/object/computed';
import { task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  store: service(),
  officialPoints: 0,
  practicePoints: 0,
  appearances: [],
  init: function() {
    this._super(...arguments);
    this.setScores();
    this.setAppearances();
  },
  setAppearances: function() {
    const that = this;
    this.get('model.round.appearances').then(function(appearances) {
      const updatedAppearances = appearances.map(function(appearance) {
        return appearance;
      })
      that.set('appearances', updatedAppearances);
    });
  },
  setScores: function() {
    const that = this;

    this.get('model.songs').then(async function(songs) {
      let officialPoints = 0;
      let practicePoints = 0;
      await songs.map(async function(song) {
        let scores = await song.get('scores');
        scores.map(async function(score) {
          const panelist = await score.get('panelist');
          if (panelist.kind == 'Practice')
            await that.set('practicePoints', that.get('practicePoints') + score.intPoints);
          else if (panelist.kind == 'Official') {
            console.log("Official");
            await that.set('officialPoints', that.get('officialPoints') + score.intPoints);
          }
        });
      });
    });
  },
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
  sortedSongs: sort(
    'model.songs',
    'sortedSongsProperties',
  ),
  mockAppearance: task(function *() {
    let appearance = yield this.model.mock({
    });
    yield this.store.pushPayload('appearance', appearance);
    this.flashMessages.success("Mocked!");
  }).drop(),
});
