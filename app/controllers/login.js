import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  session: service(),
  collapsed: true,
  actions: {
    passwordless () {
      const lockOptions = {
        configurationBaseUrl: 'https://cdn.auth0.com',
        allowAutocomplete: true,
        allowedConnections: ['email'],
        autoclose: true,
        avatar: null,
        closeable: true,
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
        allowForgotPassword: false,
        allowSignUp: false,
        initialScreen: 'login',
        passwordlessMethod: 'link',
        languageDictionary: {
          title: "Barberscore",
          passwordlessEmailInstructions: "Enter your email address<br>registered with the BHS.  (If you aren't currently registered with the BHS, or can't remember your email, please contact <a href='mailto:customerservice@barbershop.org'>customerservice@barbershop.org</a> for assistance.)",
          success: {
            magicLink:  "Check your email for the log in link.  If you don't receive on within a minute or so, be sure to check your spam/junk filter!"
          },
          error: {
            passwordless: {
              "lock.fallback":  "We're sorry, we can't log you in either because that email is not registered with the BHS or you are not the admin contact for your group.  Try again with a different email address or contact customerservice@barbershop.org for assistance.",
            }
          }
        },
      };
      this.session.authenticate(
        'authenticator:auth0-lock-passwordless',
        lockOptions
      );
    },
    password () {
      const lockOptions = {
        configurationBaseUrl: 'https://cdn.auth0.com',
        allowAutocomplete: true,
        allowedConnections: [
          'Default',
        ],
        autoclose: true,
        avatar: null,
        closeable: true,
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
            scope: 'openid'
          }
        },
        allowLogin: true,
        allowForgotPassword: true,
        allowSignUp: true,
        initialScreen: 'login',
        languageDictionary: {
          title: "Barberscore",
        },
      };
      this.session.authenticate(
        'authenticator:auth0-lock',
        lockOptions
      );
    },
  }
});
