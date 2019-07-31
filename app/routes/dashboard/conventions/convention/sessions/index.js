import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
  currentUser: service(),
  model() {
    let { convention_id } = this.paramsFor('dashboard.conventions.convention');
    return this.store.query('session', {
      'owners': this.currentUser.user.id,
      'status__gt': 0,
      'status__lt': 30,
      'convention_id': convention_id,
      // 'kind__gt': 21,
    });
  },
});
