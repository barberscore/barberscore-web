import Ember from 'ember';

export default Ember.Controller.extend({
  isEditing: false,
  isDisabled: Ember.computed.not('isEditing'),
  isCollapsed: false,
  isExpanded: Ember.computed.not('isCollapsed'),
  actions: {
    toggleCollapsed() {
      return this.toggleProperty('isCollapsed');
    },
    setEditing() {
      this.set('isEditing', true);
    },
    cancelEdits() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    saveEdits() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.get('model').save()
      .then(() => {
        flashMessages.success('Success');
        this.set('isEditing', false);
      })
      .catch((error) => {
        console.log(error);
        flashMessages.danger('Failure');
      });
    }
  }
});
