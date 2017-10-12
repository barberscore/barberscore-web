import Route from '@ember/routing/route';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
export default Route.extend(UnauthenticatedRouteMixin, {
  model() {
    return this.get('store').query('round', {
      'session__convention__status': 20,
    });
  }
});
