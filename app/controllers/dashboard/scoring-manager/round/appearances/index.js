import Ember from 'ember';
// import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  sortedAppearancesProperties: [
    'num',
  ],
  sortedAppearances: Ember.computed.sort(
    'model.appearances',
    'sortedAppearancesProperties'
  ),
});
