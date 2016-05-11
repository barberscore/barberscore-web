import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  sortSubmissions: [
    'chart.name:asc',
  ],
  submissionChoices: Ember.computed.sort(
    'model.performer.submissions',
    'sortSubmissions'
  ),
  actions: {
   createSubmission(submissionTitle) {
      let cht = this.get('store').queryRecord('chart', {
        name: submissionTitle
      });
      let per  = this.get('model.performer');
      let newSubmission = this.get('store').createRecord('submission', {
        performer: per,
        chart: cht
      });
      newSubmission.save();
      this.set('submission', newSubmission);
    },
  },
});
