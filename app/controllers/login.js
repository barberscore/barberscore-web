import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  session: service(),
  collapsed: true,
  actions: {
    login () {
      const lockOptions = {
        autoclose: true,
        icon: '/assets/bhs_logo.png',
        closeable: true,
        focusInput: true,
        gravatar: false,
        primaryColor: '#337ab7',
        rememberLastLogin: true,
        dict: {
          title: "Barberscore",
          email: {
            headerText: "Enter your email address<br>registered with the BHS.",
            footerText: "(If you aren't currently registered with the BHS, or can't remember your email, please contact <a href='mailto:customerservice@barbershop.org'>customerservice@barbershop.org</a> for assistance.)"
          },
          emailSent: {
            success:  "Check your email for the log in link.  If you don't receive on within a minute or so, be sure to check your spam/junk filter!"
          },
          error: {
            passwordless: {
              "bad.connection":  "We're sorry, we can't log you in either because that email is not registered with the BHS or you are not the admin contact for your group.  Try again with a different email address or contact customerservice@barbershop.org for assistance.",
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
