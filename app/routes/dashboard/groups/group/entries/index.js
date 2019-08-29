import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
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
