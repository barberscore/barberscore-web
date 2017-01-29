import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  actions: {
    addSubmission() {
let submission = this.get('store').createRecord('submission', {
        performer: this.get('model'),
        title: this.get('submission')
      });
      submission.save()
      .then(() => {
        this.set('submission', null);
        this.get('flashMessages').success("Added");
      })
      .catch((error) => {
        submission.deleteRecord();
        console.log(error);
        this.get('flashMessages').danger("Error");
      });
    },
    deleteSubmission(submission) {
submission.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
        this.transitionToRoute('admin.registration-manager.performer');
      })
      .catch((error) => {
        console.log(error);
      });
    },
    addContestant() {
      this.get('store').createRecord('contestant', {
        performer: this.get('model'),
        contest: this.get('contest'),
      });
    },
  },
});
