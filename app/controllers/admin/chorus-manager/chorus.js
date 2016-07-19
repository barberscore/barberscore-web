import Ember from 'ember';

export default Ember.Controller.extend({
  isEditing: false,
  isRoleEditing: false,
  isDisabled: Ember.computed.not('isEditing'),
  isRoleDisabled: Ember.computed.not('isRoleEditing'),
  collapseChorus: false,
  isRoleCollapsed: false,
  actions: {
    collapseHeader() {
      this.toggleProperty('collapseChorus');
    },
    collapseRole() {
      this.toggleProperty('collapseRole');
    },
    newChorus() {
      let newChorus = this.store.createRecord(
        'chorus'
      );
      this.set('model', newChorus);
      this.set('isEditing', true);
    },
    editChorus() {
      this.set('isEditing', true);
    },
    cancelChorus() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    deleteChorus() {
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
    saveChorus() {
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
    newRole() {
      let newRole = this.store.createRecord(
        'chorus'
      );
      this.set('model', newRole);
      this.set('isRoleEditing', true);
    },
    editRole() {
      this.set('isRoleEditing', true);
    },
    cancelRole() {
      this.model.rollbackAttributes();
      this.set('isRoleEditing', false);
    },
    deleteRole() {
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
    saveRoles() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.save()
      .then(response => {
        response.get('roles').invoke('save');
        this.set('isRoleEditing', false);
        flashMessages.success('Saved');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
  },
});
