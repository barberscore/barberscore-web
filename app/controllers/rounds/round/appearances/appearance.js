import { computed } from '@ember/object';
import { sort, filterBy } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  participantsSortProperties: [
    'partSort',
  ],
  sortedParticipants: sort(
    'model.entry.participants',
    'participantsSortProperties'
  ),
  filteredDirectors: filterBy(
    'model.entry.participants',
    'part',
    'Director',
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
