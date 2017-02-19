import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  currentUser: Ember.inject.service('current-user'),
  model: function() {
    let user = this.get('currentUser.user.id');
    let convention = this.get('store').query('convention', {
      // 'entity__memberships__person__user': user,
      'entity__memberships__officers__office__short_name': 'DRCJ',
    });
    return convention;
    // return convention.filterBy('entity__memberships__person__user', user);
  },
});
