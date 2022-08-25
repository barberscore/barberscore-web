import Controller from '@ember/controller';
import { sort, not } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import { denodeify } from 'rsvp'

export default Controller.extend({
  isDisabled: not(
    'model.permissions.write',
  ),
  sortedAssignmentsProperties: [
    'kindSort',
    'categorySort',
    'lastName',
    'firstName',
  ],
  sortedAssignments: sort(
    'model.assignments',
    'sortedAssignmentsProperties'
  ),
  flashMessages: service(),
  router: service(),
  algolia: service(),
  store: service(),
  searchPerson: task(function* (term){
    yield timeout(600);
    let func = denodeify(this.algolia.search.bind(this.algolia))
    let res = yield func({ indexName: 'Person', query: term})
    return res.hits
  }),
  createAssignmentModal: false,
  createAssignmentModalError: false,
  categoryOptions: [
    'PC',
    'ADM',
    'Music',
    'Performance',
    'Singing',
  ],
  kindOptions: [
    'Official',
    'Practice',
    'Observer',
  ],
  saveAssignment: task(function* (obj, category, kind){
    try {
      yield this.model.get('assignments').createRecord({
        personId: obj.objectID,
        category: category,
        kind: kind,
        name: obj.name,
        firstName: obj.first_name,
        lastName: obj.last_name,
        district: obj.get_district_display,
        email: obj.email,
        cellPhone: obj.cell_phone,
        bhsId: obj.bhs_id,
        imageId: obj.image_id,
        session: this.model,
      }).save();
      // let p = yield assignment.build({
      //   'by': this.get('currentUser.user.id'),
      // });
      // yield this.store.pushPayload(p);
      this.set('createAssignmentModal', false);
      this.set('createAssignmentModalError', false);
      this.set('person', null);
      this.set('category', null);
      this.set('kind', null);
      this.flashMessages.success("Created!");
      // this.router.transitionTo('dashboard.conventions.convention.sessions.session.entries.entry', entry.get('id'));
      this.router.transitionTo('dashboard.conventions.convention.sessions.session.assignments');
    } catch(e) {
      this.set('createAssignmentModalError', true);
    }
  }).drop(),
  actions: {
    cancelAssignment(assignment){
      assignment.deleteRecord();
    },
  }
});
