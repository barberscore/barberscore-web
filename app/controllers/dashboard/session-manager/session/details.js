import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  isEditing: false,
  isDisabled: Ember.computed.not('isEditing'),
  sortedContestsProperties: [
    'organizationKindSort',
    'awardQualifier',
    'awardPrimary:desc',
    'awardAgeSort',
    'awardName',
  ],
  sortedContests: Ember.computed.sort(
    'model.contests',
    'sortedContestsProperties'
  ),
  primaryCP: Ember.computed(
    'sortedContests', function() {
    return this.get('sortedContests.firstObject');
  }),
  actions: {
    editSession() {
      this.set('isEditing', true);
    },
    cancelSession() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    deleteSession() {
      this.model.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
        this.transitionToRoute('dashboard.session-manager.convention.sessions');
      });
    },
    saveSession() {
      this.model.save()
      .then(() => {
        this.set('isEditing', false);
        this.get('flashMessages').success('Saved');
      });
    },
  }
});
