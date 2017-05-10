import Ember from 'ember';

export default Ember.Controller.extend({
  isEditing: false,
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
    editPerson() {
      this.set('isEditing', true);
    },
    cancelPerson() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    deletePerson() {
      this.model.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
        this.transitionToRoute('dashboard');
      });
    },
    savePerson() {
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
