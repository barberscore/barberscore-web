import Ember from 'ember';

export default Ember.Component.extend({
  sess: Ember.inject.service('session'),

  actions: {
    authenticate: function() {
      var authenticator = 'authenticator:jwt';
      var credentials = this.getProperties('identification', 'password');

      this.get('sess').authenticate(authenticator, credentials);
    }
  }
});
