import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    newOrganization() {
      let newOrganization = this.store.createRecord(
        'organization'
      );
      this.set('model', newOrganization);
      this.set('isEditing', true);
    },
    editOrganization() {
      this.set('isEditing', true);
    },
    cancelOrganization() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    deleteOrganization() {
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
    saveOrganization() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.save()
      .then(() => {
        this.transitionToRoute('admin.organizations.organization', this.model);
        this.set('isEditing', false);
        flashMessages.success('Saved');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
  },
});
