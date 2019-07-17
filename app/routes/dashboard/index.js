import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';
// import { isEmpty } from '@ember/utils';

export default Route.extend(AuthenticatedRouteMixin, {
  currentUser: service(),
  session: service(),
  store: service(),
  model() {
    return this.get('currentUser.user');
  },
});
