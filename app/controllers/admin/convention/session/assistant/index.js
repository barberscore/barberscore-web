import Ember from 'ember';

export default Ember.Controller.extend({
  isEditing: false,
  actions: {
    newAssistant() {
      let newAssistant = this.store.createRecord(
        'assistant'
      );
      this.set('model', newAssistant);
      this.set('isEditing', true);
    },
    editAssistant() {
      this.set('isEditing', true);
    },
    cancelAssistant() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    deleteAssistant() {
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
    saveAssistant() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.save()
      .then(() => {
        // this.transitionToRoute('admin.assistant', this.model);
        this.set('isEditing', false);
        flashMessages.success('Saved');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
  },
});
