import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
// import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
export default Route.extend({
  session: service(),
  router: service(),
  activate: function() {
    if (location.hash.includes("state=") ||
      location.search.includes("error=")) {
        this.session.authenticate('authenticator:auth0', {}).then(() => {
        this.router.transitionTo('dashboard');
      });
    }
  }
});
