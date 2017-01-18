import Ember from 'ember';

export default Ember.Controller.extend({
  isEditing: false,
  isCollapsed: true,
  isRoleEditing: false,
  isDisabled: Ember.computed.not('isEditing'),
  isRoleDisabled: Ember.computed.not('isRoleEditing'),
  collapseChorus: false,
  isRoleCollapsed: false,
  optionsSession: Ember.computed(function() {
    return this.get('store').query('session', {'status': 4});
  }),
  actions: {
    collapseHeader() {
      this.toggleProperty('isCollapsed');
    },
    setEditing() {
      this.set('isEditing', true);
    },
    undoEditing() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    saveEditing() {
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
    addPerformer() {
      const flashMessages = Ember.get(this, 'flashMessages');
      var performer = this.get('store').createRecord('performer', {
        session: this.get('session'),
        group: this.get('model'),
      });
      performer.save()
      .then(() => {
        this.set('group', null);
        flashMessages.success('Success');
      })
      .catch((error) => {
        performer.deleteRecord();
        console.log(error);
        flashMessages.danger('Error');
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
    //   const flashMessages = Ember.get(this, 'flashMessages');
    //   this.model.destroyRecord()
    //   .then(() => {
    //     flashMessages.warning('Deleted');
    //     this.transitionToRoute('admin');
    //   })
    //   .catch(() => {
    //     flashMessages.danger('Error');
    //   });
    // },
    // saveRoles() {
    //   const flashMessages = Ember.get(this, 'flashMessages');
    //   this.model.save()
    //   .then(response => {
    //     response.get('roles').invoke('save');
    //     this.set('isRoleEditing', false);
    //     flashMessages.success('Saved');
    //   })
    //   .catch(() => {
    //     flashMessages.danger('Error');
    //   });
    // },
  },
});
