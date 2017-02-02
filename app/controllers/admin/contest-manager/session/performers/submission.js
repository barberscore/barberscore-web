import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  isEditing: false,
  isDisabled: Ember.computed.not('isEditing'),
  flashMessage: Ember.get(this, 'flashMessages'),
  searchTask: task(function* (term){
    yield timeout(600);
    return this.get('store').query('person', {
      'nomen__icontains': term,
      'page_size': 1000
      })
      .then((data) => data);
  }),
  performerSortProperties: [
    'nomen',
  ],
  sortedItems: Ember.computed.sort(
    'model.session.performers',
    'performerSortProperties'
  ),
  submissionSortProperties: [
    'title',
  ],
  sortedSubmissions: Ember.computed.sort(
    'model.submissions',
    'submissionSortProperties'
  ),
  actions: {
    previousItem(cursor) {
      let nowCur = this.get('sortedItems').indexOf(cursor);
      let newCur = this.get('sortedItems').objectAt(nowCur-1);
      this.transitionToRoute('admin.contest-manager.session.performers.performer', newCur);
    },
    nextItem(cursor) {
      let nowCur = this.get('sortedItems').indexOf(cursor);
      let newCur = this.get('sortedItems').objectAt(nowCur+1);
      this.transitionToRoute('admin.contest-manager.session.performers.performer', newCur);
    },
    editPerformer() {
      this.set('isEditing', true);
    },
    cancelPerformer() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    deletePerformer() {
      let session = this.model.session;
      this.model.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
        this.transitionToRoute('admin.contest-manager.session', session);
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
    savePerformer() {
      this.model.save()
      .then(() => {
        this.set('isEditing', false);
        this.get('flashMessages').success('Saved');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
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
    deleteSubmission(submission) {
      submission.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
  },
});
