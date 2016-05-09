import Ember from 'ember';

export default Ember.Component.extend({
  sortSubmissions: [
    'name:asc',
  ],
  submissionChoices: Ember.computed.sort(
    'model.performer.submissions',
    'sortSubmissions'
  )
});
