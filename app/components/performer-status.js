import Ember from 'ember';

export default Ember.Component.extend({
  performerStatus: [
    'New',
    'Qualified',
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
