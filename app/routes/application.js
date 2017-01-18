import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth-auth0/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  currentUser: Ember.inject.service('current-user'),
  session: Ember.inject.service(),
  beforeModel() {
    return this._loadCurrentUser();
  },
  sessionAuthenticated() {
    this._super(...arguments);
    this._loadCurrentUser().catch(() => this.get('session').invalidate());
  },
  _loadCurrentUser() {
    return this.get('currentUser').load();
  },
  actions: {
    login () {
      var lockOptions = {
        allowedConnections: [
          'Username-Password-Authentication',
        ],
        autoclose: true,
        allowLogin: true,
        allowSignUp: false,
        rememberLastLogin: true,
        theme: {
          logo: 'https://s3-us-west-1.amazonaws.com/barberscore/static/images/bhs_logo.png',
          primaryColor: '#337ab7'
        },
        languageDictionary: {
          title: "Barberscore"
        },
        auth: {
          redirect: false,
          params: {
            scope: 'openid profile',
          }
        }
      };
      this.get('session').authenticate('authenticator:auth0-lock', lockOptions);
    },
    logout () {
      this.get('session').invalidate();
    }
  }
});
