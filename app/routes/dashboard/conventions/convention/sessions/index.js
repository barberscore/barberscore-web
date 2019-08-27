import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
  currentUser: service(),
  model() {
    let { convention_id } = this.paramsFor('dashboard.conventions.convention');
    return this.store.query('session', {filter: {
      'convention_id': convention_id,
    }});
  },
});
