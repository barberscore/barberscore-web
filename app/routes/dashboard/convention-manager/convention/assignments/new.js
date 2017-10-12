import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.get('store').createRecord('assignment', {
      'status': 'Active',
      'convention': this.modelFor('dashboard.convention-manager.convention'),
    });
  },
});
