import Ember from 'ember';
// import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  finishersSortProperties: [
    'totPoints:desc',
  ],
  sortedAppearances: Ember.computed.sort(
    'model.appearances',
    'finishersSortProperties'
  ),
});
