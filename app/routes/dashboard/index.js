import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';

export default Route.extend(AuthenticatedRouteMixin, {
  currentUser: service(),
  session: service(),
  store: service(),
  model() {
    let userId = this.get('currentUser.user.id');
    if (isEmpty(userId)) {
      let username = this.get('session.data.authenticated.profile.sub');
      return this.store.query('person', {
        'user__username': username
      }).then(response => response.firstObject);
    } else {
      return this.store.query('person', {
        'user': userId
      }).then(response => response.firstObject);
    }
  },
});
