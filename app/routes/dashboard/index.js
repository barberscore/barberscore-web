import Route from '@ember/routing/route';
// import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';
// import { isEmpty } from '@ember/utils';

export default Route.extend({
  currentUser: service(),
  session: service(),
  store: service(),

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  },
  userRoles() {
    let profile = this.get('session.data.authenticated.profile')
    console.log("userRoles called");
    console.log(profile);
    if (this.get('session.isAuthenticated')) {
    console.log(this.get('session.data'));
    let roles = profile['https://www.barberscore.com/roles'];
    return roles;
    }
  },
  model() {
    return RSVP.hash({
      currentUser: this.get('currentUser.user'),
      userRoles: this.userRoles()
    });
  },
});
