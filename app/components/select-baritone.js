import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  contestantSortProperties: ['name:asc',],
  sortedRoles: Ember.computed.sort(
    'model.group.roles',
    'contestantSortProperties'
  ),
  filteredRoles: Ember.computed.filterBy(
    'sortedRoles',
    'part',
    'Baritone'
  )
});
