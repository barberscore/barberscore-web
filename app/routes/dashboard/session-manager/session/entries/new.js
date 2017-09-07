import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.get('store').createRecord('entry', {
      'isEvaluation': true,
      'isPrivate': false,
      'session': this.modelFor('dashboard.session-manager.session'),
      'appearances': [],
      'contestants': [],
      'participants': [],
    });
  },
});
