import Ember from 'ember';

export default Ember.Controller.extend({
  isEditing: true,
  isDisabled: Ember.computed.not('isEditing'),
  flashMessage: Ember.get(this, 'flashMessages'),
  representingFilter: Ember.computed.filterBy(
    'model.memberships',
    'entityKind',
    'Chorus'
  ),
  representingOptions: Ember.computed.mapBy(
    'representingFilter',
    'entity'
  ),
  actions: {
    editMembership() {
      this.set('isEditing', true);
    },
    cancelMembership() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    deleteMembership() {
      this.model.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
        this.set('isEditing', false);
        this.transitionToRoute('admin.quartet-manager.quartet.details');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
    saveMembership() {
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
