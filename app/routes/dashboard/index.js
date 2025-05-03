import Route from '@ember/routing/route';
// import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';
// import { isEmpty } from '@ember/utils';

export default Route.extend({
  currentUser: service(),
  session: service(),
  store: service(),
  router: service(),

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
    let profile = this.get('session.data.authenticated.profile')
    if (!profile) {
      this.router.transitionTo('login');
    }
  },
  userRoles() {
    let profile = this.get('session.data.authenticated.profile')
    console.log("userRoles called");
    console.log(profile);
    if (this.get('session.isAuthenticated') && profile) {
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
