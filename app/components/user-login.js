import Ember from 'ember';

export default Ember.Component.extend({
  sess: Ember.inject.service('session'),
  actions: {
    authenticate: function() {
      const flashMessages = Ember.get(this, 'flashMessages');
      var authenticator = 'authenticator:jwt';
      var credentials = this.getProperties('identification', 'password');

      this.get('sess').authenticate(authenticator, credentials).catch((reason) => {
        let emailErrors = reason.email;
        let passwordErrors = reason.password;
        let formErrors = reason.non_field_errors;
        if (emailErrors) {
          emailErrors.forEach(function(item){
            flashMessages.danger("Email: " + item);
          });
        }
        if (passwordErrors) {
          passwordErrors.forEach(function(item){
            flashMessages.danger("Password: " + item);
          });
        }
        if (formErrors) {
          formErrors.forEach(function(item){
            flashMessages.danger("Error: " + item);
          });
        }
      });
    }
  }
});
