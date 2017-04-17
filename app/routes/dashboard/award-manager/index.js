import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  currentUser: Ember.inject.service('current-user'),
  model() {
    let user = this.get('currentUser.user.id');
    return this.get('store').query('award', {
      'drcj': user,
      'page_size': 1000
    });
  },
});
