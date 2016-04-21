import Ember from 'ember';

export default Ember.Controller.extend({
  isEditing: false,
  actions: {
    newJudge() {
      let newJudge = this.store.createRecord(
        'judge'
      );
      this.set('model', newJudge);
      this.set('isEditing', true);
    },
    editJudge() {
      this.set('isEditing', true);
    },
    cancelJudge() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    deleteJudge() {
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
    saveJudge() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.save()
      .then(() => {
        // this.transitionToRoute('admin.judge', this.model);
        this.set('isEditing', false);
        flashMessages.success('Saved');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
  },
});
