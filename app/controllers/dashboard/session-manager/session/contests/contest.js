import { computed } from '@ember/object';
import { sort, alias, filterBy } from '@ember/object/computed';
import Controller, { inject as controller } from '@ember/controller';

export default Controller.extend({
  contestantSortProperties: [
    'nomen:asc',
  ],
  filteredContestants: filterBy(
    'model.contestants',
    'status',
    'Included'
  ),
  sortedContestants: sort(
    'filteredContestants',
    'contestantSortProperties'
  ),
  contestManager: controller('dashboard.session-manager.session.contests.index'),
  sortedItems: alias('contestManager.sortedContests'),
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
      this.transitionToRoute('dashboard.session-manager.session.contests.contest', newCur);
    },
    nextItem(cursor) {
      let nowCur = this.get('sortedItems').indexOf(cursor);
      let newCur = this.get('sortedItems').objectAt(nowCur+1);
      this.transitionToRoute('dashboard.session-manager.session.contests.contest', newCur);
    },
  },
});
