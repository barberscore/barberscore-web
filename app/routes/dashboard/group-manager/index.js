import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  currentUser: Ember.inject.service('current-user'),
  model: function() {
    let user = this.get('currentUser.user.id').then((data) => data);
    return this.get('store').query('member', {
      'person__user': user,
      'is_admin': true,
      'status__gte': '0',
      'page_size': 100,
    });
  },
});
