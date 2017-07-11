import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  currentUser: Ember.inject.service('current-user'),
  model: function() {
    return this.get('store').query('entity', {
      'kind__lt': 30, // TODO Hardcoded
      'officers__person__user': this.get('currentUser.user.id'),
      'status__gte': 0,
    });
  },
});
