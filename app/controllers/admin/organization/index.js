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
        this.transitionToRoute('admin.organization', this.model);
        this.set('isEditing', false);
        flashMessages.success('Saved');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
  },
  awardSort: [
    'organization',
    'is_primary:desc',
    'is_novice:desc',
    'is_improved:asc',
    'name',
    'kind',
    'size',
    'scope'
  ],
  sortedAwards: Ember.computed.sort(
    'model.awards',
    'awardSort'
  )
});
