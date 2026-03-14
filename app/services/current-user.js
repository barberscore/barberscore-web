import Service, { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import RSVP from 'rsvp';
import * as Sentry from '@sentry/ember';

export default Service.extend({
  session: service(),
  store: service(),

  load() {
    let id = this.get('session.data.authenticated.profile.sub');
    if (!isEmpty(id)) {
      return this.store.findRecord(
        'user', id
      ).then(user => {
        Sentry.setUser({
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
        });
        return this.set('user', user);
      }).catch(err => {
        console.error(err);
        throw err;
      });
    } else {
      return RSVP.resolve();
    }
  }
});
