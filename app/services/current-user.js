import Service, { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import RSVP from 'rsvp';
import Sentry from '../sentry';

export default Service.extend({
  session: service(),
  store: service(),

  load() {
    let id = this.get('session.data.authenticated.profile.sub');
    if (!isEmpty(id)) {
      return this.store.findRecord(
        'user', id
      ).then(user => {
        return user;
      }).catch(err => {
        alert(err.errors[0].detail)
        return RSVP.resolve()
      }).then((user) => {
        Sentry.configureScope(scope => {
          scope.setUser({
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
          });
        });
        return this.set('user', user);
      });
    } else {
      return RSVP.resolve();
    }
  }
});
