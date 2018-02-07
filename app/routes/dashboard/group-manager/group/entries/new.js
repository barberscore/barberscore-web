import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  model() {
    let entry = this.get('store').createRecord('entry', {
      'isEvaluation': true,
      'isPrivate': false,
      'group': this.modelFor('dashboard.group-manager.group'),
      'contestants': [],
      'description': '',
      'competitor': null,
    });
    return entry;
  },
});
