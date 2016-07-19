import Ember from 'ember';

export default Ember.Controller.extend({
  isRaw: false,
  performerSortProperties: [
    'totPoints:desc',
    'sngPoints:desc',
    'musPoints:desc',
    'prsPoints:desc'
  ],
  sortedPerformers: Ember.computed.sort(
    'model.performers',
    'performerSortProperties'
  ),
  contestSortProperties: ['name:asc',],
  championshipContests: Ember.computed.filterBy(
    'model.contests',
    'is_qualifier',
    false
  ),
  sortedContests: Ember.computed.sort(
    'championshipContests',
    'contestSortProperties'
  ),
  actions: {
    letsGo() {
      this.toggleProperty('isRaw');
    },
  },
});
