import Ember from 'ember';
// import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),
  finishersSortProperties: [
    'entryTotPoints:desc',
  ],
  filteredFinishers: Ember.computed.filterBy(
    'model.appearances',
    'isFinisher'
  ),
  sortedFinishers: Ember.computed.sort(
    'filteredFinishers',
    'finishersSortProperties'
  ),
});
