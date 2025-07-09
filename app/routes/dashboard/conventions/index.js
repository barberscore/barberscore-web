import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
// import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend({
  currentUser: service('current-user'),
  store: service(),
  model() {
    return this.store.query('convention', {filter:{
      'status': 10,
      'owners': this.currentUser.user.id,
    }});
  },
});
