import Ember from 'ember';

export default Ember.Controller.extend({
  isEditing: true,
  isDisabled: Ember.computed.not('isEditing'),
  flashMessage: Ember.get(this, 'flashMessages'),
  actions: {
    editCatalog() {
      this.set('isEditing', true);
    },
    cancelCatalog() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    saveCatalog() {
      this.model.save()
      .then(() => {
        this.set('isEditing', false);
        this.get('flashMessages').success('Saved');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
  },
});
