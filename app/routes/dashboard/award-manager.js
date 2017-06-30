import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  currentUser: Ember.inject.service('current-user'),
  model() {
    let user_id = this.get('currentUser.user.id');
    return this.get('store').query('award', {
      'entity__officers__person__user': user_id,
      'page_size': 100
    });
  },
});
