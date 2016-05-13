import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  isEditing: false,
  actions: {
    newPerson() {
      let newPerson = this.store.createRecord(
        'person'
      );
      this.set('model', newPerson);
      this.set('isEditing', true);
    },
    editPerson() {
      this.set('isEditing', true);
    },
    cancelPerson() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    deletePerson() {
      this.model.destroyRecord();
    },
    savePerson() {
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
  },
});
