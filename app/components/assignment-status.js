import Ember from 'ember';

export default Ember.Component.extend({
  judgeStatus: [
    'New',
    'Scheduled',
    'Confirmed',
    'Validated',
    'Final',
  ]
});
