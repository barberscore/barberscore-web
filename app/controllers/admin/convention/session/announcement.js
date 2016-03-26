import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  contestSortProperties: ['name:asc',],
  sortedContests: Ember.computed.sort(
    'model.contests',
    'contestSortProperties'
  ),
});
