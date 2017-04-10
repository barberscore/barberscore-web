import Ember from 'ember';
// import { task, timeout } from 'ember-concurrency';
import groupBy from 'ember-group-by';

export default Ember.Controller.extend({

  // appearanceModel: Ember.computed.alias('model.id'),
  // scoreCall: Ember.computed(function() {
  //   return this.get('store').query('score', {
  //     'song__appearance': this.get('appearanceModel'),
  //     'page_size': 50,
  //   });
  // }),
  scoreCall: Ember.computed(
    'model.songs', function() {
      let scores = Ember.A();
      this.get('model.songs').forEach(function(item) {
        let subs = item.get('scores');
        subs.forEach(function(foo) {
          scores.pushObject(foo);
        });
      });
      return scores;
    }
  ),
  // sortedScoresProperties: [
  //   'num',
  //   'songNum:asc',
  // ],
  // sortedScores: Ember.computed.sort(
  //   'scoreCall',
  //   'sortedScoresProperties'
  // ),
  // scoresByNum: groupBy(
  //   'sortedScores',
  //   'num'
  // ),
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
  }
});
