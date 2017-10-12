import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  currentUser: service('current-user'),
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
