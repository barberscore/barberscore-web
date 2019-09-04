import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  model({ entry_id }) {
    let { group_id } = this.paramsFor('dashboard.groups.group');
    return RSVP.hash({
      entry: this.store.findRecord('entry', entry_id),
      group: this.store.findRecord('group', group_id),
    });
  }
});
