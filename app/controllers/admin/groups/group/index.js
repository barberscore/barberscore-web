import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    newGroup() {
      let newGroup = this.store.createRecord(
        'group'
      );
      this.set('model', newGroup);
      this.set('isEditing', true);
    },
    editGroup() {
      this.set('isEditing', true);
    },
    cancelGroup() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    deleteGroup() {
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
    saveGroup() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.save()
      .then(() => {
        this.transitionToRoute('admin.groups.group', this.model);
        this.set('isEditing', false);
        flashMessages.success('Saved');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
    deleteRole(role) {
      role.destroyRecord();
    },
  },
});
