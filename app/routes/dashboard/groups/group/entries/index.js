import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
  currentUser: service(),
  model() {
    let { group_id } = this.paramsFor('dashboard.groups.group');
    return this.store.query(
      'entry', {
        filter: {
          'group_id': group_id,
        },
      }
    );
  },
});
