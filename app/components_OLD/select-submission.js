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
      isCollapsed:      this.model.set('submission', submission);
      this.model.save()
      .then(() => {
        // this.get('flashMessages').success('Success');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
  },
});

