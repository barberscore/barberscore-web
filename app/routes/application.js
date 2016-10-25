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
        autoclose: true,
        auth: {
          redirect: false,
          // I think this may be the key to DRF
          // redirect: true,
          // redirectUrl: 'api',
          // responseMode: 'form_post',
          // responseType: 'code',

          params: {
            scope: 'openid email name user_metadata app_metadata picture offline_access',
            prompt: 'consent'
          }
        },
        additionalSignUpFields: [{
          name: 'name',
          placeholder: 'Full Name',
        }]
      };

      // var lockOptions = {
      //   authParams:{
      //     scope: 'openid email name user_metadata app_metadata picture',
      //     connections: ['google-oauth2', 'Username-Password-Authentication'],
      //     connection_scopes: {
      //       'google-oauth2': [
      //         'profile',
      //         'https://www.googleapis.com/auth/drive.photos.readonly',
      //       ]
      //     },
      //     access_type: 'offline',
      //   },
      // };
      this.get('session').authenticate('authenticator:auth0-lock', lockOptions);
    },

    logout () {
      this.get('session').invalidate();
    }
  }
});
