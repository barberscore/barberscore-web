import { A } from '@ember/array';
import { computed } from '@ember/object';
import { sort, mapBy, sum } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { task } from 'ember-concurrency';

export default Controller.extend({
  openModal: false,
  flashMessages: service(),
  sortedSongsProperties: [
    'num',
  ],
  sortedSongs: sort(
    'model.songs',
    'sortedSongsProperties'
  ),
  sortedItemsProperties: [
    'num',
  ],
  sortedItems: sort(
    'model.round.appearances',
    'sortedItemsProperties'
  ),
  isPrevDisabled: computed(
    'model',
    'sortedItems', function() {
    return this.model == this.get('sortedItems.firstObject');
  }),
  isNextDisabled: computed(
    'model',
    'sortedItems', function() {
    return this.model == this.get('sortedItems.lastObject');
  }),
  scoresCall: computed(
    'model.songs', function() {
    let out = A();
    this.get('model.songs').then((data) => {
      let foo = data;
      foo.forEach(function(item) {
        let bar = item.get('scores');
        bar.forEach(function(foobar) {
          out.pushObject(foobar);
        });
      });
    });
    return out;
  }),
  sortedPanelistsProperties: [
    'kind',
  ],
  sortedPanelists: sort(
    'model.round.panelists',
    'sortedPanelistsProperties'
  ),
  sortedScoresProperties: [
    'category',
    'kind',
    'panelistName',
    'songNum',
  ],
  sortedScores: sort(
    'scoresCall',
    'sortedScoresProperties'
  ),
  mappedScores: mapBy(
    'sortedScores',
    'points'
  ),
  sumScores: sum(
    'mappedScores'
  ),
  scoresVariance: mapBy(
    'scoresCall',
    'hasVariance'
  ),
  hasVariance: computed(
    'scoresVariance', function() {
      return this.get('scoresVariance').any(
        function(item) {
          return item;
        });
  }),
  scratchAppearance: task(function *() {
    let appearance = yield this.model.scratch({
      'by': this.get('currentUser.user.id')
    });
    this.store.pushPayload('appearance', appearance);
    this.get('flashMessages').success("Scratched!");
  }).drop(),
  startAppearance: task(function *() {
    let appearance = yield this.model.start({
      'by': this.get('currentUser.user.id')
    });
    this.store.pushPayload('appearance', appearance);
    this.get('flashMessages').success("Started!");
  }).drop(),
  finishAppearance: task(function *() {
    let appearance = yield this.model.finish({
      'by': this.get('currentUser.user.id')
    });
    this.store.pushPayload('appearance', appearance);
    this.get('flashMessages').success("Finished!");
  }).drop(),
  confirmAppearance: task(function *() {
    yield this.get('sortedScores').invoke('save');
    let appearance = yield this.model.confirm({
      'by': this.get('currentUser.user.id')
    });
    this.store.pushPayload('appearance', appearance);
    this.get('flashMessages').success("Confirmed!");
  }).drop(),
  printVar: task(function *() {
    try {
      let appearance = yield this.model.printVar();
      this.store.pushPayload('appearance', appearance);
      this.get('flashMessages').success("Activated!");
    } catch(e) {
      this.get('flashMessages').danger("Please check that all fields are entered!");
    }
  }).drop(),
  actions: {
    previousItem(cursor) {
      let nowCur = this.get('sortedItems').indexOf(cursor);
      let newCur = this.get('sortedItems').objectAt(nowCur-1);
      this.transitionToRoute('dashboard.scoring-manager.round.appearances.appearance', newCur);
    },
    nextItem(cursor) {
      let nowCur = this.get('sortedItems').indexOf(cursor);
      let newCur = this.get('sortedItems').objectAt(nowCur+1);
      this.transitionToRoute('dashboard.scoring-manager.round.appearances.appearance', newCur);
    },
    saveSong(song) {
      song.save()
      .then(() => {
        this.get('flashMessages').success('Success');
      });
    },
    saveScores() {
      this.get('sortedScores').invoke('save');
      this.get('flashMessages').success('Success');
      this.set('openModal', false);
    }
  }
});
