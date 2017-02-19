import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  flashMessage: Ember.get(this, 'flashMessages'),
  isEditing: false,
  isDisabled: Ember.computed.not('isEditing'),
  actions: {
    editSession() {
      this.set('isEditing', true);
    },
    cancelSession() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    deleteSession() {
      this.model.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
        this.transitionToRoute('admin.contest-manager.convention.sessions');
      })
      .catch((error) => {
        console.log(error);
        this.get('flashMessages').danger('Error!');
      });
    },
    saveSession() {
      this.model.save()
      .then(() => {
        this.set('isEditing', false);
        this.get('flashMessages').success('Saved');
      })
      .catch((error) => {
        console.log(error);
        this.model.rollbackAttributes();
        this.get('flashMessages').danger('Error');
      });
    },
  }
});
