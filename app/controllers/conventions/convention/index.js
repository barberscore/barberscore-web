import Ember from 'ember';

export default Ember.Controller.extend({
  sessionSortProperties: ['kind:asc',],
  sessionsSorted: Ember.computed.sort(
    'model.sessions',
    'sessionSortProperties'
  ),
});
