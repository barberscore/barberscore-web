import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  model({ assignment_id }) {
    return this.store.findRecord('assignment', assignment_id, {
    });
  }
});
