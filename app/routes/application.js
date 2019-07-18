import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ApplicationRouteMixin from 'ember-simple-auth-auth0/mixins/application-route-mixin';
import Sentry from '../sentry';

export default Route.extend(ApplicationRouteMixin, {
  currentUser: service(),
  session: service(),

  beforeModel() {
    this._super(...arguments);
    return this._loadCurrentUser();
  },

  sessionAuthenticated() {
    this._super(...arguments);
    this._loadCurrentUser();
    this._setSentryUser();
  },

  _loadCurrentUser() {
    return this.currentUser.load().catch(() => this.session.invalidate());
  },
  _setSentryUser() {
    return Sentry.setUser({
        "id": this.currentUser.user.id,
        "email": this.currentUser.user.email,
        "username": this.currentUser.user.name,
    });
  }
});
