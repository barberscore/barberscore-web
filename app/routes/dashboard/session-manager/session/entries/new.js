import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.get('store').createRecord('entry', {
      'isEvaluation': true,
      'isPrivate': false,
      'session': this.modelFor('dashboard.session-manager.session'),
      'contestants': [],
      'description': '',
      'competitor': null,
    });
  },
});
