import { sort } from '@ember/object/computed';
import Controller from '@ember/controller';
// import { task, timeout } from 'ember-concurrency';

export default Controller.extend({
  finishersSortProperties: [
    'entryTotPoints:desc',
  ],
  sortedAppearances: sort(
    'model.appearances',
    'finishersSortProperties'
  ),
});
