import { computed } from '@ember/object';
import { not, sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  store: service(),
  flashMessages: service(),
  isEditing: false,
  isDisabled: not('isEditing'),
  sortedContestsProperties: [
    'groupKindSort',
    'awardQualifier',
    'awardPrimary:desc',
    'awardAgeSort',
    'awardName',
  ],
  sortedContests: sort(
    'model.contests',
    'sortedContestsProperties'
  ),
  primaryCP: computed(
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
