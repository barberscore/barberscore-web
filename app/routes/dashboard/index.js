import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default Route.extend(AuthenticatedRouteMixin, {
  currentUser: service('current-user'),
  store: service(),
  model() {
    return RSVP.hash({
      activeGroups:  this.get('store').query('group', {
        'officers__person__user': this.get('currentUser.user.id'),
        'status': 10,
      }),
      activeConventions:  this.get('store').query('convention', {
        'assignments__person__user': this.get('currentUser.user.id'),
        'status': 10,
      }),
      activeAssignments:  this.get('store').query('assignment', {
        'person__user': this.get('currentUser.user.id'),
        'status': 10,
        'convention__status': 10,
      }),
    });
  }
});
