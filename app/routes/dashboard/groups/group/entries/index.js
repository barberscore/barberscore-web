import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  model() {
    let group = this.modelFor('dashboard.groups.group');
    let group_id = group.get('id');
    let kind = group.get('kind');
    let kindMap = {
      'Chorus': 32,
      'VLQ': 32,
      'Quartet': 41,
    }
    return RSVP.hash({
      group: group,
      entries: this.store.query('entry', {'filter': {'group_id': group_id}}),
      sessions: this.store.query(
        'session', {
          'filter': {
            'status': 4, // Open Session; hard-coded
            'is_invitational': false,
            'kind': kindMap[kind],
          }
        }
      ),
    });
  },
});
