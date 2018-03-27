import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default Route.extend(AuthenticatedRouteMixin, {
  // currentUser: service('current-user'),
  // store: service(),
  // model() {
  //   return RSVP.hash({
  //     activeOfficers:  this.get('store').query('officer', {
  //       'person__user': this.get('currentUser.user.id'),
  //       'status': 10,
  //       'group__status': 10,
  //     }),
  //     activeAssignments:  this.get('store').query('assignment', {
  //       'person__user': this.get('currentUser.user.id'),
  //       'status': 10,
  //       'convention__status': 10,
  //     }),
  //   });
  // }
});
