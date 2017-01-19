import Ember from 'ember';

export default Ember.Controller.extend({
  isEditing: false,
  flashMessage: Ember.get(this, 'flashMessages'),
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
      isCollapsed:      let session = this.model;
      this.model.destroyRecord()
      .then(() => {
        console.log(session);
        this.set('isEditing', false);
        this.transitionToRoute('admin.contest-manager.session', session);
        this.get('flashMessages').warning('Deleted');
      })
      .catch((error) => {
        console.log(error);
        this.get('flashMessages').danger('Error');
      });
    },
    saveAssignment() {
      isCollapsed:      this.model.save()
      .then(() => {
        // this.transitionToRoute('admin.assignment', this.model);
        this.set('isEditing', false);
        this.get('flashMessages').success('Saved');
      })
      .catch((failure) => {
        this.model.rollbackAttributes();
        this.get('flashMessages').danger(failure);
      });
    },
  },
});
