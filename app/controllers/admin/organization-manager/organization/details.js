import Ember from 'ember';

export default Ember.Controller.extend({
  isEditing: false,
  isDisabled: Ember.computed.not('isEditing'),
  isWrite: Ember.computed.not('model.permissions.write'),
  flashMessage: Ember.get(this, 'flashMessages'),
  actions: {
    editOrganization() {
      this.set('isEditing', true);
    },
    cancelOrganization() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    deleteOrganization() {
      this.model.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
        this.transitionToRoute('admin');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
    saveOrganization() {
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
