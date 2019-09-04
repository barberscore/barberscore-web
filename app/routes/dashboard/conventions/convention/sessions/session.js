import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  model({ session_id }) {
    return this.store.findRecord('session', session_id, {
      'included': 'contests,entries,assignments',
    });
  }
});
