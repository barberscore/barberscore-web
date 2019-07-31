import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  currentUser: service('current-user'),
  model() {
    return this.store.query('convention', {
      'status': 10,
      'persons__owners': this.currentUser.user.id,
    });
  },
});
