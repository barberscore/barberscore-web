import Ember from 'ember';

export default Ember.Component.extend({
  performerStatus: [
    'New',
    'Invited',
    'Accepted',
    'Declined',
    'Dropped',
    'Evaluation',
    'Official',
    'Disqualified',
    'Finished',
    'Final',
  ]
});
