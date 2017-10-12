import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.get('store').createRecord('award', {
      'status': 'Active',
      'isManual': false,
      children: [],
      contests: [],
    });
  },
});
