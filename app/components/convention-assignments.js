import { sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import { denodeify } from 'rsvp'
import Component from '@ember/component';

export default Component.extend({
  store: service(),
  algolia: service(),
  flashMessages: service(),
  sortedAssignmentsProperties: [
    'categorySort',
    'kindSort',
    'personSort',
  ],
  sortedAssignments: sort(
    'model.assignments',
    'sortedAssignmentsProperties'
  ),
  searchPerson: task(function* (term){
    yield timeout(600);
    let func = denodeify(this.algolia.search.bind(this.algolia))
    let res = yield func({ indexName: 'Person', query: term})
    return res.hits
  }),
  createAssignmentModal: false,
  createAssignmentModalError: false,
  saveAssignment: task(function* (obj, category, kind){
    try {
      // let person = yield this.store.findRecord('person', obj.objectID)
      let assignment = yield this.store.createRecord('assignment', {
        personId: obj.objectID,
        convention: this.model,
        category: category,
        kind: kind,
      }).save();
      let p = yield assignment.activate({
        'by': this.get('currentUser.user.id'),
      });
      yield this.store.pushPayload(p);
      this.set('createAssignmentModal', false);
      this.set('createAssignmentModalError', false);
      this.set('person', null);
      this.set('category', null);
      this.set('kind', null);
      this.flashMessages.success("Created!");
    } catch(e) {
      e.errors.forEach((e) => {
        this.set('createAssignmentModalError', true);
        this.flashMessages.danger(e.detail);
      })
    }
  }).drop(),
  deleteAssignment: task(function *(assignment) {
    try {
      yield assignment.destroyRecord();
      this.flashMessages.success("Deleted!");
    } catch(e) {
      this.flashMessages.danger("Problem!");
    }
  }).drop(),
  categoryOptions: [
    'DRCJ',
    'CA',
    'Music',
    'Performance',
    'Singing',
  ],
  kindOptions: [
    'Official',
    'Practice',
    'Observer',
  ],
  actions: {
    cancelAssignment(assignment){
      assignment.deleteRecord();
    },
  }
});
