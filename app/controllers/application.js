import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  actions: {
    invalidateSession () {
      this.get('session').invalidate();
    },
    login () {
      const lockOptions = {
        autoclose: true,
        icon: 'https://barberscore-api.herokuapp.com/static/api/bhs_logo.png',
        closeable: true,
        focusInput: true,
        gravatar: false,
        primaryColor: '#337ab7',
        rememberLastLogin: true,
        dict: {
          title: "Barberscore",
          email: {
            headerText: "Enter your email address<br>registered with the BHS.",
            footerText: "(If you aren't currently registered with the BHS, or can't remember your email, please contact <a href='mailto:support@barberscore.com'>support@barberscore.com</a> for assistance.)"
          },
          emailSent: {
            success:  "Check your email for the log in link.  PLEASE NOTE: It may take up to a minute for the email to be sent, so please be patient."
          },
          error: {
            passwordless: {
              "bad.connection":  "We're sorry, we can't log you in because that email is not registered with the BHS.  Try again with a different email address or contact support@barberscore.com for assistance.",
            }
          }
        },
      };
      this.get('session').authenticate(
        'authenticator:auth0-lock-passwordless',
        'magiclink',
        lockOptions
      );
    },
  }
});
