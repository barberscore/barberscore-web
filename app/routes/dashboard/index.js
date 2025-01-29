import Route from '@ember/routing/route';
// import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';
// import { isEmpty } from '@ember/utils';

export default Route.extend({
  currentUser: service(),
  session: service(),
  store: service(),
  userRoles() {
    let profile = this.get('session.data.authenticated.profile')
    let roles = profile['https://www.barberscore.com/roles'];
    return roles;
  },
  model() {
    return RSVP.hash({
      currentUser: this.get('currentUser.user'),
      userRoles: this.userRoles()
    });
  },
});
