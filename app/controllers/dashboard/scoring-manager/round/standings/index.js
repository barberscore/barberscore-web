import Ember from 'ember';
// import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  finishersSortProperties: [
    'entryTotPoints:desc',
  ],
  sortedAppearances: Ember.computed.sort(
    'model.appearances',
    'finishersSortProperties'
  ),
});
