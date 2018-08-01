import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  currentUser: service('current-user'),
  model() {
    return this.get('store').query('group', {
      'members__person__user': this.get('currentUser.user.id'),
      'members__status': 10,
      'status': 10,
      'kind__gt': 21,
    });
  },
});
