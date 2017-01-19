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
  flashMessage: Ember.get(this, 'flashMessages'),
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
      isCollapsed:      this.model.save()
      .then(() => {
        this.set('isEditing', false);
        this.get('flashMessages').success('Saved');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
    addPerformer() {
      isCollapsed:      var performer = this.get('store').createRecord('performer', {
        session: this.get('session'),
        group: this.get('model'),
      });
      performer.save()
      .then(() => {
        this.set('group', null);
        this.get('flashMessages').success('Success');
      })
      .catch((error) => {
        performer.deleteRecord();
        console.log(error);
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
