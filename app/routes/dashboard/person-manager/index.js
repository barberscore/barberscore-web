import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  currentUser: Ember.inject.service('current-user'),
  model() {
    return this.get('store').query('person', {
      'user': this.get('currentUser.user.id')
    });
  },
  redirect(model) {
    if (model.get('length') === 1) {
      this.transitionTo('dashboard.person-manager.person.details', model.get('firstObject'));
    }
  }
});
