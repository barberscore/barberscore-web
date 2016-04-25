import Ember from 'ember';

export default Ember.Component.extend({
  statusChoices: [
    'New',
    'Scheduled',
    'Confirmed',
    'Final',
  ]
});
