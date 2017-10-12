import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  currentUser: service('current-user'),
  model: function() {
    return this.get('store').query('organization', {
      'officers__person__user': this.get('currentUser.user.id'),
      'status__gte': 0,
    });
  },
});
