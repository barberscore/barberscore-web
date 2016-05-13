import Ember from 'ember';

export default Ember.Controller.extend({
  isEditing: false,
  actions: {
    newRole() {
      let newRole = this.store.createRecord(
        'role'
      );
      this.set('model', newRole);
      this.set('isEditing', true);
    },
    editRole() {
      this.set('isEditing', true);
    },
    cancelRole() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    deleteRole() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.destroyRecord()
      .then(() => {
        flashMessages.warning('Deleted');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
    saveRole() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.save()
      .then(() => {
        // this.transitionToRoute('admin.role', this.model);
        this.set('isEditing', false);
        flashMessages.success('Saved');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
  },
});
