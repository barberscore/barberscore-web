import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
// import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Route.extend({
  currentUser: service(),
  session: service(),

  beforeModel: async function() {
    this._super(...arguments);
    await this.get('session').setup();
    return this._loadCurrentUser();
  },

  sessionAuthenticated() {
    this._super(...arguments);
    this._loadCurrentUser();
  },

  _loadCurrentUser() {
    return this.currentUser.load().catch((err) => {
      console.log("Load current user failed");
      console.log(err);
      // this.session.invalidate()
    });
  },
  actions: {
    sessionRequiresAuthentication: function(){
      // Check out the docs for all the options:
      // https://auth0.com/docs/libraries/lock/customization

      // These options will request a refresh token and launch lock.js in popup mode
      var lockOptions = {authParams:{scope: 'openid'}};

      // This tells simple-lock to use our `auth0-ember-simple-auth` add-on
      this.get('session').authenticate('simple-auth-authenticator:lock', lockOptions);
    }
  }
});
