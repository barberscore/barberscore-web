import Ember from 'ember';

export default Ember.Component.extend({
  performerStatus: [
    'New',
    'Registered',
    'Accepted',
    'Declined',
    'Dropped',
    'Enrolled',
    'Scratched',
    'Disqualified',
    'Finished',
  ]
});
