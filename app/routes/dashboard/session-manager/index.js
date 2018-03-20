import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  currentUser: service('current-user'),
  model() {
    return this.get('store').query('session', {
      'convention__assignments__person__user': this.get('currentUser.user.id'),
      'status': 10,
    });
  },
});
