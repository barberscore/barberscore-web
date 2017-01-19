import Ember from 'ember';

export default Ember.Controller.extend({
  isEditing: false,
  isDisabled: Ember.computed.not('isEditing'),
  actions: {
    setEditing() {
      this.set('isEditing', true);
    },
    undoEditing() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    saveEditing() {
      this.model.save()
      .then(() => {
        this.set('isEditing', false);
        this.get('flashMessages').success('Saved');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    }
  },
});
