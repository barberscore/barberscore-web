import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  flashMessage: Ember.get(this, 'flashMessages'),
  isEditing: true,
  isDisabled: Ember.computed.not('isEditing'),
  actions: {
    cancelSession() {
      this.model.deleteRecord();
      this.transitionToRoute('admin.contest-manager.convention.sessions');
    },
    saveSession() {
      this.model.save()
      .then((saved) => {
        this.set('isEditing', false);
        this.get('flashMessages').success('Saved');
        this.transitionToRoute('admin.contest-manager.convention.sessions.session.details', saved);
      })
      .catch((error) => {
        console.log(error);
        this.model.rollbackAttributes();
        this.get('flashMessages').danger('Error');
      });
    },
  }
});
