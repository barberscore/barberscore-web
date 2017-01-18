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
    previousItem(sortedItems, cursor) {
      let nowCur = sortedItems.indexOf(cursor);
      let newCur = sortedItems.objectAt(nowCur-1);
      this.transitionToRoute('admin.contest-manager.session.performer', newCur);
    },
    nextItem(sortedItems, cursor) {
      let nowCur = sortedItems.indexOf(cursor);
      let newCur = sortedItems.objectAt(nowCur+1);
      this.transitionToRoute('admin.contest-manager.session.performer', newCur);
    },
    newPerformer() {
      let newPerformer = this.store.createRecord(
        'performer'
      );
      this.set('model', newPerformer);
      this.set('isEditing', true);
    },
    editPerformer() {
      this.set('isEditing', true);
    },
    cancelPerformer() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    deletePerformer() {
      const flashMessages = Ember.get(this, 'flashMessages');
      let session = this.model.session;
      this.model.destroyRecord()
      .then(() => {
        flashMessages.warning('Deleted');
        this.transitionToRoute('admin.contest-manager.session', session);
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
    savePerformer() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.save()
      .then(() => {
        this.set('isEditing', false);
        flashMessages.success('Saved');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
    buildPerformer() {
      this.model.build();
    },
    scratchPerformer() {
      this.model.scratch();
    },
    disqualifyPerformer() {
      this.model.disqualify();
    },
    deleteContestant(contestant) {
      const flashMessages = Ember.get(this, 'flashMessages');
      contestant.destroyRecord()
      .then(() => {
        flashMessages.warning('Deleted');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
    deleteSubmission(submission) {
      const flashMessages = Ember.get(this, 'flashMessages');
      submission.destroyRecord()
      .then(() => {
        flashMessages.warning('Deleted');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
  },
});
