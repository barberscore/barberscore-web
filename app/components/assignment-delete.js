import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  router: service(),
  store: service(),
  flashMessages: service(),
  deleteAssignmentModal: false,
  deleteAssignmentModalError: false,
  deleteAssignment: task(function *() {
    try {
      yield this.model.destroyRecord({
        'by': this.get('currentUser.user.id'),
      });
      this.set('deleteAssignmentModal', false);
      this.set('deleteAssignmentModalError', false);
      this.flashMessages.success("Deleted!");
      this.router.transitionTo('dashboard.conventions.convention.sessions.session.assignments');
    } catch(e) {
      this.set('deleteAssignmentModalError', true);
    }
  }).drop(),
});
