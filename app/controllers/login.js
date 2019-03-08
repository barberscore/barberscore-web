import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  session: service(),
  faq1: true,
  faq2: true,
  faq3: true,
  faq4: true,
  faq5: true,
  actions: {
    password () {
      const lockOptions = {
        allowAutocomplete: true,
        allowedConnections: [
          'Default',
        ],
        allowShowPassword: true,
        autoclose: true,
        autofocus: true,
        avatar: null,
        closable: true,
        languageDictionary: {
          title: "Barberscore",
          unrecoverableError: 'Something went wrong.<br />Please contact customerservice@barbershop.org.',
        },
        rememberLastLogin: true,
        theme: {
          primaryColor: '#337ab7',
          logo: '/assets/bhs_logo.png',
          labeledSubmitButton: true,
        },
        auth: {
          autoParseHash: true,
          redirect: true,
          responseType: 'token',
          params: {
            scope: 'openid profile email'
          }
        },
        allowLogin: true,
        allowForgotPassword: true,
        allowSignUp: true,
        signUpLink: 'https://members.barbershop.org/members/register',
        initialScreen: 'login',
        configurationBaseUrl: 'https://cdn.auth0.com',
      };
      this.session.authenticate(
        'authenticator:auth0-lock',
        lockOptions
      );
    },
  }
});
