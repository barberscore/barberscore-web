import Ember from 'ember';

export default Ember.Component.extend({
  performerStatus: [
    'New',
    'Qualified',
    'Accepted',
    'Declined',
    'Dropped',
    'Official',
    'Finished',
    'Final',
  ]
});
