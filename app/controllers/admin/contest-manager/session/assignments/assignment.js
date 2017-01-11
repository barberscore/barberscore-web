import Ember from 'ember';

export default Ember.Controller.extend({
  isEditing: false,
  actions: {
    newAssignment() {
      let newAssignment = this.store.createRecord(
        'assignment'
      );
      this.set('model', newAssignment);
      this.set('isEditing', true);
    },
    editAssignment() {
      this.set('isEditing', true);
    },
    cancelAssignment() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    deleteAssignment() {
      const flashMessages = Ember.get(this, 'flashMessages');
      let session = this.model;
      this.model.destroyRecord()
      .then(() => {
        console.log(session);
        this.set('isEditing', false);
        this.transitionToRoute('admin.contest-manager.session', session);
        flashMessages.warning('Deleted');
      })
      .catch((error) => {
        console.log(error);
        flashMessages.danger('Error');
      });
    },
    saveAssignment() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.save()
      .then(() => {
        // this.transitionToRoute('admin.assignment', this.model);
        this.set('isEditing', false);
        flashMessages.success('Saved');
      })
      .catch((failure) => {
        this.model.rollbackAttributes();
        flashMessages.danger(failure);
      });
    },
  },
});
