import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  isEditing: false,
  isDisabled: Ember.computed.not('isEditing'),
  flashMessage: Ember.get(this, 'flashMessages'),
  searchTask: task(function* (term){
    yield timeout(600);
    return this.get('store').query('catalog', {
      'nomen__icontains': term,
      'page_size': 1000
      })
      .then((data) => data);
  }),
  // SubmissionSortProperties: [
  //   'nomen',
  // ],
  // sortedItems: Ember.computed.sort(
  //   'model.session.Submissions',
  //   'SubmissionSortProperties'
  // ),
  // submissionSortProperties: [
  //   'title',
  // ],
  // sortedSubmissions: Ember.computed.sort(
  //   'model.submissions',
  //   'submissionSortProperties'
  // ),
  actions: {
    // previousItem(cursor) {
    //   let nowCur = this.get('sortedItems').indexOf(cursor);
    //   let newCur = this.get('sortedItems').objectAt(nowCur-1);
    //   this.transitionToRoute('admin.contest-manager.session.Submissions.Submission', newCur);
    // },
    // nextItem(cursor) {
    //   let nowCur = this.get('sortedItems').indexOf(cursor);
    //   let newCur = this.get('sortedItems').objectAt(nowCur+1);
    //   this.transitionToRoute('admin.contest-manager.session.Submissions.Submission', newCur);
    // },
    editSubmission() {
      this.set('isEditing', true);
    },
    cancelSubmission() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    deleteSubmission() {
      let performer = this.model.performer;
      this.model.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
        this.transitionToRoute('admin.registration-manager.performer', performer);
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
    saveSubmission() {
      this.model.save()
      .then(() => {
        this.set('isEditing', false);
        this.get('flashMessages').success('Saved');
      })
      .catch((error) => {
        console.log(error);
        this.get('flashMessages').danger('Error');
      });
    },
  },
});
