import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth-auth0/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  currentUser: Ember.inject.service('current-user'),
  session: Ember.inject.service(),
  beforeModel() {
    this._super(...arguments);
    return this._loadCurrentUser();
  },
  sessionAuthenticated() {
    this._super(...arguments);
    this._loadCurrentUser().catch(() => this.get('session').invalidate());
  },
  _loadCurrentUser() {
    return this.get('currentUser').load();
  },
});
