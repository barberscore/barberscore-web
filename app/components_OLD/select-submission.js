import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  sortSubmissions: [
    'title:asc',
  ],
  submissionChoices: Ember.computed.sort(
    'model.performance.performer.submissions',
    'sortSubmissions'
  ),
  actions: {
   saveSubmission(submission) {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.set('submission', submission);
      this.model.save()
      .then(() => {
        // flashMessages.success('Success');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
  },
});

