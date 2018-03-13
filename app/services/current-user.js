import Service, { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import RSVP from 'rsvp';

export default Service.extend({
  session: service('session'),
  store: service(),

  load() {
    let accountId = this.get('session.data.authenticated.profile.sub');
    if (!isEmpty(accountId)) {
      return this.get('store').query('user', {
        'account_id': accountId,
      }).then(function(users) {
        return users.get('firstObject');
      }).catch(err => {
        alert(err.errors[0].detail)
        return RSVP.resolve()
      }).then((user) => {
        return this.set('user', user);
      });
    } else {
      return RSVP.resolve();
    }
  }
});
