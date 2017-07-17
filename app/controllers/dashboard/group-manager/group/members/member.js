import Ember from 'ember';

export default Ember.Controller.extend({
  isEditing: false,
  isDisabled: Ember.computed.not('isEditing'),
  flashMessages: Ember.inject.service(),
  representingFilter: Ember.computed.filterBy(
    'model.members',
    'groupKind',
    'Group'
  ),
  representingOptions: Ember.computed.mapBy(
    'representingFilter',
    'group'
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
        this.transitionToRoute('dashboard.group-manager.group.details');
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
