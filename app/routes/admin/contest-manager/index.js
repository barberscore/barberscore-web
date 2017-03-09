import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  currentUser: Ember.inject.service('current-user'),
  model: function() {
    let user_id = this.get('currentUser.user.id');
    return this.get('store').query('session', {
      'convention__assignments__person__user': user_id,
      'convention__assignments__kind': 5 //Hard-coded
    });
  },
});
