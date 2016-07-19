import Ember from 'ember';

export default Ember.Component.extend({
  assignmentStatus: [
    'New',
    'Scheduled',
    'Confirmed',
    'Validated',
    'Final',
  ]
});
