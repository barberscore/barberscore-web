import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    newAward() {
      let newAward = this.store.createRecord(
        'award'
      );
      this.set('model', newAward);
      this.set('isEditing', true);
    },
    editAward() {
      this.set('isEditing', true);
    },
    cancelAward() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    deleteAward() {
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
    saveAward() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.save()
      .then(() => {
        this.transitionToRoute('admin.awards.award', this.model);
        this.set('isEditing', false);
        flashMessages.success('Saved');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
  },
  seasonChoices: [
    'International',
    'Midwinter',
    'Spring',
    'Fall',
  ]
});
