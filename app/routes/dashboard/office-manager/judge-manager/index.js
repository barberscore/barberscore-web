import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.get('store').query('officer', {
      'office__is_cj': 'true', //Hard-coded
      'page_size': 1000
    });
  },
});
