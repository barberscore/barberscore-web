import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  actions: {
    addSubmission() {
      const flashMessages = Ember.get(this, 'flashMessages');
      let submission = this.get('store').createRecord('submission', {
        performer: this.get('model'),
        title: this.get('submission')
      });
      submission.save()
      .then(() => {
        this.set('submission', null);
        flashMessages.success("Added");
      })
      .catch((error) => {
        submission.deleteRecord();
        console.log(error);
        flashMessages.danger("Error");
      });
    },
    deleteSubmission(submission) {
      const flashMessages = Ember.get(this, 'flashMessages');
      submission.destroyRecord()
      .then(() => {
        flashMessages.warning('Deleted');
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
