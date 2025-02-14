import Route from '@ember/routing/route';
// import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';

export default Route.extend({
  currentUser: service(),
  store: service(),
  model() {
    let { session_id } = this.paramsFor('dashboard.conventions.convention.sessions.session');
    return this.store.query('round', {filter: {
      'session_id': session_id,
    }});
  },
});
