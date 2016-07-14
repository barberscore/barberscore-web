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
    newCertification() {
      let newCertification = this.store.createRecord(
        'certification'
      );
      this.set('model', newCertification);
      this.set('isEditing', true);
    },
    editCertification() {
      this.set('isEditing', true);
    },
    cancelCertification() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    deleteCertification() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.destroyRecord()
      .then(() => {
        flashMessages.warning('Deleted');
        this.transitionToRoute('admin');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
    saveCertification() {
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
