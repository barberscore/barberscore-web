import Ember from 'ember';

export default Ember.Controller.extend({
  isEditing: false,
  isDetailsCollapsed: false,
  isContestingCollapsed: false,
  isSubmissionsCollapsed: false,
  isRolesCollapsed: false,
  actions: {
    toggleDetails() {
      return this.toggleProperty('isDetailsCollapsed');
    },
    toggleContesting() {
      return this.toggleProperty('isContestingCollapsed');
    },
    toggleSubmissions() {
      return this.toggleProperty('isSubmissionsCollapsed');
    },
    toggleRoles() {
      return this.toggleProperty('isRolesCollapsed');
    },
    previousItem(sortedItems, cursor) {
      let nowCur = sortedItems.indexOf(cursor);
      let newCur = sortedItems.objectAt(nowCur-1);
      this.transitionToRoute('admin.cm.session.performer', newCur);
    },
    nextItem(sortedItems, cursor) {
      let nowCur = sortedItems.indexOf(cursor);
      let newCur = sortedItems.objectAt(nowCur+1);
      this.transitionToRoute('admin.cm.session.performer', newCur);
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
        this.transitionToRoute('admin.cm.session', session);
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
      contestant.destroyRecord();
    },
    deleteSubmission(submission) {
      submission.destroyRecord();
    },
  },
});
