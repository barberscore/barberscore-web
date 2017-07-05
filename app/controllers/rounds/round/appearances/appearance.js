import Ember from 'ember';

export default Ember.Controller.extend({
  // store: Ember.inject.service(),
  participantsSortProperties: [
    'partSort',
  ],
  sortedParticipants: Ember.computed.sort(
    'model.entry.participants',
    'participantsSortProperties'
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
      this.transitionToRoute('rounds.round.appearances.appearance', newCur);
    },
    nextItem(cursor) {
      let nowCur = this.get('sortedItems').indexOf(cursor);
      let newCur = this.get('sortedItems').objectAt(nowCur+1);
      this.transitionToRoute('rounds.round.appearances.appearance', newCur);
    },
  }
});
