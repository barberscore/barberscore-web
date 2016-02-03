import Ember from 'ember';

export default Ember.Controller.extend({
  sess: Ember.inject.service('session'),

  actions: {
    authenticate: function() {
      var credentials = this.getProperties('identification', 'password'),
        authenticator = 'authenticator:jwt';

      this.get('sess').authenticate(authenticator, credentials);
    }
  }
});
