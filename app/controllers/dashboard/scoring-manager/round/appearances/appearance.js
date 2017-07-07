import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Controller.extend({
  openModal: false,
  flashMessages: Ember.inject.service(),
  sortedSongsProperties: [
    'num',
  ],
  sortedSongs: Ember.computed.sort(
    'model.songs',
    'sortedSongsProperties'
  ),
  sortedItemsProperties: [
    'num',
  ],
  sortedItems: Ember.computed.sort(
    'model.round.appearances',
    'sortedItemsProperties'
  ),
  isPrevDisabled: Ember.computed(
    'model',
    'sortedItems', function() {
    return this.model == this.get('sortedItems.firstObject');
  }),
  isNextDisabled: Ember.computed(
    'model',
    'sortedItems', function() {
    return this.model == this.get('sortedItems.lastObject');
  }),
  scoresCall: Ember.computed(
    'model.songs', function() {
    let out = Ember.A();
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
  sortedPanelists: Ember.computed.sort(
    'model.round.panelists',
    'sortedPanelistsProperties'
  ),
  sortedScoresProperties: [
    'category',
    'kind',
    'panelistName',
    'songNum',
  ],
  sortedScores: Ember.computed.sort(
    'scoresCall',
    'sortedScoresProperties'
  ),
  mappedScores: Ember.computed.mapBy(
    'sortedScores',
    'points'
  ),
  sumScores: Ember.computed.sum(
    'mappedScores'
  ),
  scoresVariance: Ember.computed.mapBy(
    'scoresCall',
    'hasVariance'
  ),
  hasVariance: Ember.computed(
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
