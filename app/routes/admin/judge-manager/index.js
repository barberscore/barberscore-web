import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.get('store').query('officer', {
      'office__kind': 1, //Hard-coded
      'page_size': 1000
    });
  },
});
