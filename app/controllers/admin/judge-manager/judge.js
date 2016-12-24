import Ember from 'ember';

export default Ember.Controller.extend({
  statusOptions: [
    'Active',
    'Inactive',
  ],
  kindOptions: [
    'Chair',
    'Past Chair',
    'Specialist',
    'Certified',
    'Candidate',
  ],
  categoryOptions: [
    'Admin',
    'Music',
    'Presentation',
    'Singing',
  ],
  isEditing: false,
  isDisabled: Ember.computed.not('isEditing'),
  actions: {
    newJudge() {
      let newJudge = this.store.createRecord(
        'judge'
      );
      this.set('model', newJudge);
      this.set('isEditing', true);
    },
    editJudge() {
      this.set('isEditing', true);
    },
    cancelJudge() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    deleteJudge() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.destroyRecord()
      .then(() => {
        flashMessages.warning('Deleted');
        this.transitionToRoute('admin.judge-manager');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
    saveJudge() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.save()
      .then(() => {
        this.set('isEditing', false);
        flashMessages.success('Saved');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
  },
});
