import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  judgeSortProperties: ['slot',],
  sortedJudges: Ember.computed.sort(
    'model.round.session.judges',
    'judgeSortProperties'
  ),
});
