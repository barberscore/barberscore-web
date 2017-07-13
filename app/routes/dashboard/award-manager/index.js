import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  currentUser: Ember.inject.service('current-user'),
  model() {
    return this.get('store').query('award', {
      'entity__officers__person__user': this.get('currentUser.user.id'),
      'entity__officers__office__is_award_manager': true,
      'page_size': 100
    });
  },
});
