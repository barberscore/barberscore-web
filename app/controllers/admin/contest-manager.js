import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  currentUser: Ember.inject.service('current-user'),
  store: Ember.inject.service(),
  assignmentSort: [
    'status',
  ],
  assignments: Ember.computed(
    function() {
      return this.get('currentUser.user.person.judges');
    }
  ),
  contestAssignments: Ember.computed(
    function() {
      let user = this.get('currentUser.user.id');
      console.log(user);
      return this.get('store').query('session', {
        'assignments__judge__person__user': user
      });
    }
  ),
  sessionSortProperties: [
    'convention.start_date:asc',
  ],
  sortedSessions: Ember.computed.sort(
    'model',
    'sessionSortProperties'
  ),
  searchTask: task(function* (term){
    yield timeout(600);
    return this.get('store').query('session', {'nomen__icontains': term})
      .then((data) => data);
  }),
  actions: {
    sortBy(sessionSortProperties) {
      this.set('sessionSortProperties', [sessionSortProperties]);
    },
    transitionSession(session) {
      this.transitionToRoute('admin.contest-manager.session', session);
    },
  },
});
