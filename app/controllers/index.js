import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  actions: {
    // login () {
    //   const lockOptions = {
    //     allowedConnections: [
    //       'Default',
    //     ],
    //     autoclose: true,
    //     allowLogin: true,
    //     allowSignUp: false,
    //     rememberLastLogin: true,
    //     theme: {
    //       logo: 'https://barberscore-django.herokuapp.com/static/app/bhs_logo.png',
    //       primaryColor: '#337ab7'
    //     },
    //     languageDictionary: {
    //       title: "Barberscore"
    //     },
    //     auth: {
    //       redirect: true,
    //       params: {
    //         scope: 'openid profile',
    //       }
    //     }
    //   };
    //   this.get('session').authenticate('authenticator:auth0-lock', lockOptions);
    // },
  }
});
