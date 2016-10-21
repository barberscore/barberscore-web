import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  currentUser: Ember.inject.service(),
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
      var lockOptions = {authParams:{scope: 'openid profile'}};
      this.get('session').authenticate('simple-auth-authenticator:lock', lockOptions);
    },
    logout () {
      this.get('session').invalidate();
    }
  }
});
