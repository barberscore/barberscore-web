import { computed } from '@ember/object';
import { not, sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { task, timeout } from 'ember-concurrency';

export default Controller.extend({
  flashMessages: service(),
  isDisabled: not(
    'model.permissions.write',
  ),
  activateAssignmentModal: false,
  activateAssignmentModalError: false,
  activateAssignment: task(function *() {
    try {
      let assignment = yield this.model.activate({
        'by': this.get('currentUser.user.id'),
      });
      this.store.pushPayload('assignment', assignment);
      this.set('activateAssignmentModal', false);
      this.set('activateAssignmentModalError', false);
      this.get('flashMessages').success("Deactivated!");
    } catch(e) {
      this.set('activateAssignmentModalError', true);
    }
  }).drop(),
  deactivateAssignmentModal: false,
  deactivateAssignmentModalError: false,
  deactivateAssignment: task(function *() {
    try {
      let assignment = yield this.model.deactivate({
        'by': this.get('currentUser.user.id'),
      });
      this.store.pushPayload('assignment', assignment);
      this.set('deactivateAssignmentModal', false);
      this.set('deactivateAssignmentModalError', false);
      this.get('flashMessages').success("Deactivated!");
    } catch(e) {
      this.set('deactivateAssignmentModalError', true);
    }
  }).drop(),
  deleteAssignmentModal: false,
  deleteAssignmentModalError: false,
  deleteAssignment: task(function *() {
    try {
      yield this.model.destroyRecord();
      this.set('deleteAssignmentModal', false);
      this.set('deleteAssignmentModalError', false);
      this.get('flashMessages').success("deleted!");
      this.transitionToRoute('dashboard.convention-manager.convention.assignments.index');
    } catch(e) {
      this.set('deleteAssignmentModalError', true);
    }
  }).drop(),
  searchPerson: task(function* (term){
    yield timeout(600);
    return this.get('store').query('person', {
      'nomen__icontains': term,
      'page_size': 1000
      })
      .then((data) => data);
  }),
  autosave: task(function* (property, value){
    this.get('model').set(property, value);
    yield timeout(1000);
    try {
      yield this.get('model').save();
      this.get('flashMessages').success("Saved");
    } catch(e) {
      e.errors.forEach((error) => {
        this.get('flashMessages').danger(error.detail);
      })
    }
  }).restartable(),
  panelistSortProperties: [
    'categorySort',
    'kindSort',
    'personSort',
  ],
  sortedItems: sort(
    'model.round.panelists',
    'panelistSortProperties'
  ),
  isPrevDisabled: computed(
    'model',
    'sortedItems', function() {
    return this.model == this.get('sortedItems.firstObject');
  }),
  isNextDisabled: computed(
    'model',
    'sortedItems', function() {
    return this.model == this.get('sortedItems.lastObject');
  }),
  actions: {
    previousItem(cursor) {
      let nowCur = this.get('sortedItems').indexOf(cursor);
      let newCur = this.get('sortedItems').objectAt(nowCur-1);
      this.transitionToRoute('dashboard.convention-manager.convention.assignments.assignment', newCur);
    },
    nextItem(cursor) {
      let nowCur = this.get('sortedItems').indexOf(cursor);
      let newCur = this.get('sortedItems').objectAt(nowCur+1);
      this.transitionToRoute('dashboard.convention-manager.convention.assignments.assignment', newCur);
    },
  },
});
