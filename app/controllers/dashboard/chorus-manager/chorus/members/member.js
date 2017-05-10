import Ember from 'ember';

export default Ember.Controller.extend({
  isEditing: true,
  isDisabled: Ember.computed.not('isEditing'),
  flashMessages: Ember.inject.service(),
  representingFilter: Ember.computed.filterBy(
    'model.members',
    'entityKind',
    'Chorus'
  ),
  representingOptions: Ember.computed.mapBy(
    'representingFilter',
    'entity'
  ),
  actions: {
    editMember() {
      this.set('isEditing', true);
    },
    cancelMember() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    deleteMember() {
      this.model.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
        this.set('isEditing', false);
        this.transitionToRoute('dashboard.quartet-manager.quartet.details');
      });
    },
    saveMember() {
      this.model.save()
      .then(() => {
        this.set('isEditing', false);
        this.get('flashMessages').success('Saved');
      });
    },
  },
});
