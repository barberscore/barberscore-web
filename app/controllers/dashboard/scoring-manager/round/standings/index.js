import { sort } from '@ember/object/computed';
import Controller from '@ember/controller';
// import { task, timeout } from 'ember-concurrency';

export default Controller.extend({
  sortedAppearancesProperties: [
    'totPoints:desc',
  ],
  sortedAppearances: sort(
    'model.appearances',
    'sortedAppearancesProperties'
  ),
});
