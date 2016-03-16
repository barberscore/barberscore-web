import Ember from 'ember';

export default Ember.Controller.extend({
  isRaw: false,
  actions: {
    letsGo() {
      this.toggleProperty('isRaw');
    },
  },
  judgeSortProperties: ['category',],
  judgesSorted: Ember.computed.sort(
    'model.judges',
    'judgeSortProperties'
  ),
  contestSortProperties: [
    'award.level:desc',
    'award.organization:asc',
    'award.is_primary:desc',
    'award.kind:asc',
    'award.is_improved:asc',
    'award.size:asc',
    'award.scope:asc',
  ],
  contestsSorted: Ember.computed.sort(
    'model.contests',
    'contestSortProperties'
  ),
});
