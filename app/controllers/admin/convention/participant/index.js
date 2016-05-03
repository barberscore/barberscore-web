import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    newParticipant() {
      let newParticipant = this.store.createRecord(
        'participant'
      );
      this.set('model', newParticipant);
      this.set('isEditing', true);
    },
    editParticipant() {
      this.set('isEditing', true);
    },
    cancelParticipant() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    deleteParticipant() {
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
    saveParticipant() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.save()
      .then(() => {
        this.transitionToRoute('admin.participant', this.model);
        this.set('isEditing', false);
        flashMessages.success('Saved');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
  },
});
