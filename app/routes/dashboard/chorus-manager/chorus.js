import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  redirect(model) {
    this.transitionTo('dashboard.chorus-manager.chorus.details', model);
  }
});
