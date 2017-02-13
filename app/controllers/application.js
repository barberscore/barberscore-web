import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  actions: {
    login () {
      var lockOptions = {
        allowedConnections: [
          'Default',
        ],
        autoclose: true,
        allowLogin: true,
        allowSignUp: false,
        rememberLastLogin: true,
        theme: {
          logo: 'https://s3-us-west-1.amazonaws.com/barberscore/static/app/bhs_logo.png',
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
