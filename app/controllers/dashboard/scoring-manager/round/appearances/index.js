import { sort } from '@ember/object/computed';
// import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
// import { task, timeout } from 'ember-concurrency';

export default Controller.extend({
  sortedAppearancesProperties: [
    'num',
  ],
  sortedAppearances: sort(
    'model.appearances',
    'sortedAppearancesProperties'
  ),
});
