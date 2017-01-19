import Ember from 'ember';

export default Ember.Controller.extend({
  isEditing: false,
  isDisabled: Ember.computed.not('isEditing'),
  isCollapsed: false,
  isExpanded: Ember.computed.not('isCollapsed'),
  flashMessage: Ember.get(this, 'flashMessages'),
  actions: {
    toggleCollapsed() {
      this.toggleProperty('isCollapsed');
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
      isCollapsed:      this.model.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
        this.transitionToRoute('admin');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
    saveChorus() {
      isCollapsed:      this.model.save()
      .then(() => {
        this.set('isEditing', false);
        this.get('flashMessages').success('Saved');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
    // newRole() {
    //   let newRole = this.store.createRecord(
    //     'chorus'
    //   );
    //   this.set('model', newRole);
    //   this.set('isRoleEditing', true);
    // },
    // editRole() {
    //   this.set('isRoleEditing', true);
    // },
    // cancelRole() {
    //   this.model.rollbackAttributes();
    //   this.set('isRoleEditing', false);
    // },
    // deleteRole() {
    //   isCollapsed:    //   this.model.destroyRecord()
    //   .then(() => {
    //     this.get('flashMessages').warning('Deleted');
    //     this.transitionToRoute('admin');
    //   })
    //   .catch(() => {
    //     this.get('flashMessages').danger('Error');
    //   });
    // },
    // saveRoles() {
    //   isCollapsed:    //   this.model.save()
    //   .then(response => {
    //     response.get('roles').invoke('save');
    //     this.set('isRoleEditing', false);
    //     this.get('flashMessages').success('Saved');
    //   })
    //   .catch(() => {
    //     this.get('flashMessages').danger('Error');
    //   });
    // },
  },
});
