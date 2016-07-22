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
      this.model.destroyRecord()
      .then(() => {
        flashMessages.warning('Deleted');
        this.transitionToRoute('admin');
      })
      .catch(() => {
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
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
  },
});
