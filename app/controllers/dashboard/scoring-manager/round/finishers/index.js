import { filterBy, sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
// import { task, timeout } from 'ember-concurrency';

export default Controller.extend({
  flashMessages: service(),
  finishersSortProperties: [
    'entryTotPoints:desc',
  ],
  filteredFinishers: filterBy(
    'model.appearances',
    'isFinisher'
  ),
  sortedFinishers: sort(
    'filteredFinishers',
    'finishersSortProperties'
  ),
});
