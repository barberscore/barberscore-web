import Ember from 'ember';

export default Ember.Controller.extend({
  isEditing: false,
  actions: {
    previousItem(sortedItems, cursor) {
      let nowCur = sortedItems.indexOf(cursor);
      let newCur = sortedItems.objectAt(nowCur-1);
      this.transitionToRoute('admin.convention.session.performer', newCur);
    },
    nextItem(sortedItems, cursor) {
      let nowCur = sortedItems.indexOf(cursor);
      let newCur = sortedItems.objectAt(nowCur+1);
      this.transitionToRoute('admin.convention.session.performer', newCur);
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
        this.transitionToRoute('admin.convention.session', session);
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
  contestantSortProperties: [
    'award.organization',
    'award.is_primary:desc',
    'award.is_novice:desc',
    'award.is_improved:asc',
    'award.name',
    'award.kind',
    'award.size',
    'award.scope'
  ],
  sortedContestants: Ember.computed.sort(
    'model.contestants',
    'contestantSortProperties'
  ),
  performanceSortProperties: [
    'soa',
    'name',
  ],
  sortedItems: Ember.computed.sort(
    'model.session.performers',
    'performanceSortProperties'
  ),
});
